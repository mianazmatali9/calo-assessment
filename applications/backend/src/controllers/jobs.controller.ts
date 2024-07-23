import { Request, Response } from 'express';

export const getJobs = (req: Request, res: Response) => {
  try {
    res.json({ jobs: [] });
  } catch (error) {
    res.json({ error });
  }
};
