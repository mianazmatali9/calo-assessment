import { useMutation } from '@tanstack/react-query';
import { baseApi } from '../services/baseApi';
import { Job } from '../types/jobs.type';
import { queryClient } from '../App';

const createJob = async (): Promise<Job> => {
  const response = await baseApi.post('/jobs');
  return response.data;
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
