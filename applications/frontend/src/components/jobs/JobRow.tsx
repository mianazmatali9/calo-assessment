import { useState } from 'react';
import { Avatar, Badge, Button, Table } from 'flowbite-react';
import { startCase } from 'lodash-es';

import { Job } from '../../types/job.type';
import { queryClient } from '../../App';
import { getJobById } from '../../hooks/useJobById';

const StatusColor = {
  pending: 'gray',
  resolved: 'success',
  failed: 'failure',
};

interface Props {
  job: Job;
}

const JobRow = ({ job }: Props) => {
  const [isFetching, setIsFetching] = useState(false);

  const refetchJob = async (id: string) => {
    try {
      setIsFetching(true);
      const fetchedJob = await getJobById(id);
      const existingJobs = queryClient.getQueryData<Job[]>(['jobs']);

      if (existingJobs && fetchedJob) {
        const updatedJobs = existingJobs.map((job) => (job.id === fetchedJob.id ? fetchedJob : job));
        queryClient.setQueryData(['jobs'], updatedJobs);
        setIsFetching(false);
      }
    } catch (err) {
      console.error('Error refetching job:', err);
    }
  };

  return (
    <Table.Row key={job.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {job.status === 'resolved' && job.result ? (
          <a href={job.result.urls.full} target="_blank" rel="noreferrer">
            <Avatar img={job.result.urls.thumb} title={job.result.slug} />
          </a>
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full m-auto"></div>
        )}
      </Table.Cell>
      <Table.Cell>{job.id}</Table.Cell>
      <Table.Cell>
        <div className="flex">
          <Badge color={StatusColor[job.status] || 'info'}>{startCase(job.status)}</Badge>
        </div>
      </Table.Cell>
      <Table.Cell>
        <Button color="cyan" isProcessing={isFetching} onClick={() => refetchJob(job.id)}>
          Refetch
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default JobRow;
