import express from 'express';

import { jobsRouter } from './jobs.router';
const router = express();

router.use('/jobs', jobsRouter);

export { router };
