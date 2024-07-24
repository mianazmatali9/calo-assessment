import { Request, Response } from 'express';
import { getJobsList, updateJobsList } from '../utils/jobs';
import { Job } from '../types/job.type';
import { ulid } from 'ulid';
import { sendErrorResponse } from '../utils/sendErrorResponse';
import { simulateJobProcessing } from '../jobs/unsplash.job';

export const getJobs = (req: Request, res: Response) => {
  try {
    const jobs = getJobsList();

    res.json({ jobs });
  } catch (error: any) {
    console.log(error);
    res.json({ error: error.message });
  }
};

export const createJob = (req: Request, res: Response) => {
  try {
    const jobs = getJobsList();
    const newJob: Job = {
      id: ulid(),
      status: 'pending',
    };
    jobs.push(newJob);
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
      res.status(404).send('Job not found');
    }
  } catch (err) {
    sendErrorResponse(err as Error, res);
  }
};
