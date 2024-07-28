import path from 'path';
import { Worker } from 'worker_threads';

import { getJobsList, updateJobsList } from '../utils/jobs';
import { Job, UnsplashImage } from '../types/job.type';

/**
 * Updates a specific job in the jobs list with the provided update data.
 *
 * @param {string} jobId - The ID of the job to be updated.
 * @param {Partial<Job>} updatedAttributes - An object containing the fields to be updated in the job.
 */
const updateJob = (jobId: string, updatedAttributes: Partial<Job>) => {
  const jobs = getJobsList();
  const jobIndex = jobs.findIndex(j => j.id === jobId);

  if (jobIndex !== -1) {
    jobs[jobIndex] = { ...jobs[jobIndex], ...updatedAttributes };
    updateJobsList(jobs);
  }
};

/**
 * Simulates the processing of a job by creating a new worker thread.
 * The worker processes the job and updates its status based on the outcome.
 *
 * @param {string} jobId - The ID of the job to be processed.
 */
export const simulateJobProcessing = (jobId: string) => {
  const worker = new Worker(path.join(__dirname, '../workers/jobs.worker.ts'), {
    workerData: { jobId },
  });

  worker.on('message', (message: { jobId: string; result: UnsplashImage }) => {
    console.log(`Resolved job ${jobId}! ✅`);
    updateJob(message.jobId, { status: 'resolved', result: message.result });
  });

  worker.on('error', (error) => {
    console.error(`Failed job ${jobId}! ⚠️`, error);
    updateJob(jobId, { status: 'failed' });
  });

  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
    }
  });
};
