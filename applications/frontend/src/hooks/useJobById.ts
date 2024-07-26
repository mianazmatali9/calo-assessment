import { baseApi } from '../services/baseApi';
import { Job } from '../types/job.type';

export const getJobById = async (id: string): Promise<Job> => {
  const response = await baseApi.get(`/jobs/${id}`);
  return response.data;
}
