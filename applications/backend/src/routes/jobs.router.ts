import express, { Router } from 'express';
import { getJobs } from '../controllers/jobs.controller';

const jobsRouter: Router = express.Router();

jobsRouter.get('/', getJobs);
export { jobsRouter };
