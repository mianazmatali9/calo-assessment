import path from 'path';
import fs from 'fs';
import { Job } from '../types/job.type';

const jobsFile = path.join(__dirname, '../../jobs.db.json');

export const getJobsList = (): Job[] => {
  if (!fs.existsSync(jobsFile)) {
    fs.writeFileSync(jobsFile, JSON.stringify({ jobs: [] }));
  }

  const data = fs.readFileSync(jobsFile);

  return JSON.parse(data.toString()).jobs;
};

export const updateJobsList = (jobs: Job[]) => {
  fs.writeFileSync(jobsFile, JSON.stringify({ jobs }, null, 2));
};
