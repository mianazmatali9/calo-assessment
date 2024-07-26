import { Response } from 'express';
import { CustomError } from './customError';
import { ENV } from '../config/envs';
import { Environment } from '../types/environments';
import axios from 'axios';

export const sendErrorResponse = (error: Error, res: Response) => {
  if (ENV.environment == Environment.local) {
    console.log(error);
  }

  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ message: error.message });
  } else if(axios.isAxiosError(error)) {
    res.status(error.response?.status ?? 400).json(error.response?.data || { message: 'Failed!' });
  } else if (error.message && 'statusCode' in error) {
    res.status(error.statusCode as number).json({ message: error.message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
