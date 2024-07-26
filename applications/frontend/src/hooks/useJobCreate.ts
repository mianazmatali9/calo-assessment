import { useMutation } from '@tanstack/react-query';
import { baseApi } from '../services/baseApi';
import { Job } from '../types/job.type';
import { queryClient } from '../App';
import axios from 'axios';

const createJob = async (): Promise<Job> => {
  try {
    const response = await baseApi.post('/jobs');
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw new Error('Failed to create job');
  }
};

export const useJobCreate = () => {
  return useMutation({
    mutationFn: createJob,
    onSuccess: (data) => {
      const jobs = queryClient.getQueryData<Job[]>(['jobs']);

      if (jobs) {
        const newData = [{...data, status: 'pending'}, ...jobs];

        queryClient.setQueryData(['jobs'], newData);
      }
    },
  });
};
