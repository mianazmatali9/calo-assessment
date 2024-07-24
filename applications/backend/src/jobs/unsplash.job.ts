import path from 'path';
import { Worker } from 'worker_threads';

import { getJobsList, updateJobsList } from '../utils/jobs';
import { Job, UnsplashImage } from '../types/job.type';

const updateJob = (jobId: string, update: Partial<Job>) => {
  const jobs = getJobsList();
  const jobIndex = jobs.findIndex(j => j.id === jobId);

  if (jobIndex !== -1) {
    jobs[jobIndex] = { ...jobs[jobIndex], ...update };
    updateJobsList(jobs);
  }
};


export const simulateJobProcessing = (jobId: string) => {
  const worker = new Worker(path.join(__dirname, '../workers/jobs.worker.ts'), {
    workerData: { jobId },
  });

  worker.on('message', (message: { jobId: string; result: UnsplashImage }) => {
    console.log('Updating jobs!');
    updateJob(message.jobId, { status: 'resolved', result: message.result });
  });

  worker.on('error', (error) => {
    console.error('Worker error:', error);
    updateJob(jobId, { status: 'failed' });
  });

  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
    }
  });
};
