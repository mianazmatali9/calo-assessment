import express, { Router } from 'express';
import { getJobs, createJob, getJobById } from '../controllers/jobs.controller';
import expressAsyncHandler from 'express-async-handler';

const jobsRouter: Router = express.Router();

jobsRouter.get('/', expressAsyncHandler(getJobs));
jobsRouter.post('/', expressAsyncHandler(createJob));
jobsRouter.get('/:id', expressAsyncHandler(getJobById));

export { jobsRouter };
