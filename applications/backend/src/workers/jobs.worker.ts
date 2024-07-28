import { parentPort, workerData } from 'worker_threads';
import axios from 'axios';
import { ENV } from '../config/envs';

const { jobId } = workerData;

const getRandomImageFunc = async () => {
  const imageResponse = await axios.get('https://api.unsplash.com/photos/random', {
    params: { client_id: ENV.unsplashAccessKey, query: 'food' },
  });

  return imageResponse.data;
};

const process = (jobId: string) => {
  const delay = Math.floor(Math.random() * 12 + 1) * 5000; // For 1 minutes
  // const delay = Math.floor(Math.random() * 60 + 1) * 5000; // For 5 minutes
  console.log(`Simulating job processing for job ${jobId} with delay of ${delay}ms`);

  setTimeout(async () => {
    try {
      const { id, slug, urls } = await getRandomImageFunc();
      console.log(`Job ${jobId} resolved with result ID: ${id}`);
      if (parentPort) {
        parentPort.postMessage({ jobId, result: { id, slug, urls } });
      }
    } catch (err) {
      console.error(`Error processing job ${jobId}:`, err);
      throw err;
    }
  }, delay);
};

process(jobId);
