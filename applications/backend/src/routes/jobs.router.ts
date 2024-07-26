import express, { Router, Request, Response } from 'express';
import { getJobs, createJob, getJobById } from '../controllers/jobs.controller';
import expressAsyncHandler from 'express-async-handler';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  handler: (_: Request, res: Response) =>
    res.status(429).send({ message: 'Too many requests from this IP, please try again later.' }),
});

const jobsRouter: Router = express.Router();

jobsRouter.get('/', expressAsyncHandler(getJobs));
jobsRouter.post('/', limiter, expressAsyncHandler(createJob));
jobsRouter.get('/:id', expressAsyncHandler(getJobById));

export { jobsRouter };
