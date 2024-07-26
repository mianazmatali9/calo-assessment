import { useQuery } from '@tanstack/react-query';
import { parseResponseErrors } from 'utils/parseErrorResponses';

import { baseApi } from 'services/baseApi';
import { Job } from 'types/job.type';
import { showNotification } from 'components/shared/showNotification';

const getJobs = async (): Promise<Job[]> => {
  try {
    const response = await baseApi.get('/jobs');
    return response.data.jobs;
  } catch(error) {
    showNotification({ message: parseResponseErrors(error), type: 'error' });

    throw error;
  }
}

export const useJobsList = () =>
  useQuery({
    queryKey: ['jobs'],
    queryFn: getJobs,
    refetchInterval: 5000,
  });
