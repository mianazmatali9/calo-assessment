import path from 'path';
import fs from 'fs';
import { Job } from '../types/job.type';

const jobsFile = path.join(__dirname, '../../jobs.db.json');

/**
 * Retrieves the list of jobs from the jobs.db.json file.
 * If the jobs.db.json file does not exist, it creates an empty jobs file.
 *
 * @returns {Job[]} An array of Job objects.
 */
export const getJobsList = (): Job[] => {
  if (!fs.existsSync(jobsFile)) {
    fs.writeFileSync(jobsFile, JSON.stringify({ jobs: [] }));
  }

  const data = fs.readFileSync(jobsFile);

  return JSON.parse(data.toString()).jobs;
};

/**
 * Updates the jobs list in the jobs.db.json file with the provided jobs array.
 *
 * @param {Job[]} jobs - An array of Job objects to be written to the jobs file.
 */
export const updateJobsList = (jobs: Job[]) => {
  fs.writeFileSync(jobsFile, JSON.stringify({ jobs }, null, 2));
};
