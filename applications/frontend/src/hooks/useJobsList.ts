import { useQuery } from '@tanstack/react-query';
import { baseApi } from '../services/baseApi';
import { Job } from '../types/job.type';
import { showNotification } from '../components/shared/showNotification';
import axios from 'axios';

const getJobs = async (): Promise<Job[]> => {
  try {
    const response = await baseApi.get('/jobs');
    return response.data.jobs;
  } catch(error) {
    if (axios.isAxiosError(error)) {
      showNotification({ message: error.message, type: 'error' });
    }
    throw error;
  }
}

export const useJobsList = () =>
  useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
    refetchInterval: 5000,
  });
