import { useMutation } from '@tanstack/react-query';

import { baseApi } from 'services/baseApi';
import { Job } from 'types/job.type';
import { queryClient } from 'App';
import { showNotification } from 'components/shared/showNotification';
import { parseResponseErrors } from 'utils/parseErrorResponses';

const createJob = async (): Promise<Job> => {
  try {
    const response = await baseApi.post('/jobs');
    return response.data;
  } catch (error) {
    showNotification({ message: parseResponseErrors(error), type: 'error' });
    throw error;
  }
};

export const useJobCreate = () => {
  return useMutation({
    mutationFn: createJob,
    onSuccess: (data) => {
      const jobs = queryClient.getQueryData<Job[]>(['jobs']);

      console.log('in onSuccess', data, jobs);

      if (jobs) {
        const newData = [{...data, status: 'pending'}, ...jobs];

        queryClient.setQueryData(['jobs'], newData);
      }
    },
  });
};
