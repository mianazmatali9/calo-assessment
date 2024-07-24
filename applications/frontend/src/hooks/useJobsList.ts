import { useQuery } from '@tanstack/react-query';
import { baseApi } from '../services/baseApi';
import { Job } from '../types/jobs.type';

const getJobs = async (): Promise<Job[]> => {
  const response = await baseApi.get('/jobs');
  return response.data.jobs;
}

export const useJobsList = () =>
  useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
    refetchInterval: 5000,
  });
