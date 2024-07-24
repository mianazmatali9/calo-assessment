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
  const delay = Math.floor(Math.random() * 12 + 1) * 5000;
  console.log(`Simulating job processing for job ${jobId} with delay of ${delay}ms`);

  setTimeout(async () => {
    const { id, slug, urls } = await getRandomImageFunc();
    console.log(`Job ${jobId} resolved with result ID: ${id}`);
    if (parentPort) {
      parentPort.postMessage({ jobId, result: { id, slug, urls } });
    }
  }, delay);
};

process(jobId);

export { getRandomImageFunc };
