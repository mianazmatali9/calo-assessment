import { Request, Response } from 'express';
import { ulid } from 'ulid';

import { getJobsList, updateJobsList } from '../utils/jobs';
import { Job } from '../types/job.type';
import { sendErrorResponse } from '../utils/sendErrorResponse';
import { simulateJobProcessing } from '../jobs/unsplash.job';

export const getJobs = (req: Request, res: Response) => {
  try {
    const jobs = getJobsList();

    res.json({ jobs });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const createJob = (req: Request, res: Response) => {
  try {
    const jobs = getJobsList();
    const newJob: Job = {
      id: ulid(),
      status: 'pending',
    };
    jobs.unshift(newJob);
    updateJobsList(jobs);

    simulateJobProcessing(newJob.id);

    res.send({ id: newJob.id });
  } catch (err) {
    sendErrorResponse(err as Error, res);
  }
};

export const getJobById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jobs = getJobsList();
    const job = jobs.find((j) => j.id === id);

    if (job) {
      res.json(job);
    } else {
      res.status(404).send({ message: 'Job not found' });
    }
  } catch (err) {
    sendErrorResponse(err as Error, res);
  }
};
