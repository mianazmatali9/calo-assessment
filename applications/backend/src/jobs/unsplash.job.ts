import { getRandomImageFunc } from '../services/unsplash.service';
import { getJobsList, updateJobsList } from '../utils/jobs';

export const simulateJobProcessing = (jobId: string) => {
  const delay = 1000; // Math.floor(Math.random() * 12 + 1) * 5000;
  console.log(`Simulating job processing for job ${jobId} with delay of ${delay}ms`);

  setTimeout(async () => {
    console.log(`Processing job ${jobId}...`);
    const jobs = getJobsList();
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      const { id, slug, urls } = await getRandomImageFunc();
      job.status = 'resolved';
      job.result = { id, slug, urls };
      updateJobsList(jobs);
      console.log(`Job ${jobId} resolved.`);
    } else {
      console.error(`Job ${jobId} not found.`);
    }
  }, delay);
};
