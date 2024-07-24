import { Avatar, Badge, Button, Spinner, Table } from 'flowbite-react';
import { startCase } from 'lodash-es';

import { useJobsList } from '../../hooks/useJobsList';
import { useJobCreate } from '../../hooks/useJobCreate';
import { getJobById } from '../../hooks/useJobById';
import { queryClient } from '../../App';
import { Job } from '../../types/jobs.type';
import { useState } from 'react';

const StatusColor = {
  pending: 'gray',
  resolved: 'success',
  failed: 'failure',
};

export const Jobs = (): JSX.Element | null => {
  const [loadingJobId, setLoadingJobId] = useState<string>();
  const { isLoading, data: jobs, error } = useJobsList();
  const { mutateAsync: createJob } = useJobCreate();

  const createNewJob = () => createJob();

  const refetchJob = async (id: string) => {
    try {
      setLoadingJobId(id);
      const fetchedJob = await getJobById(id);
      const existingJobs = queryClient.getQueryData<Job[]>(['jobs']);

      if (existingJobs && fetchedJob) {
        const updatedJobs = existingJobs.map((job) => (job.id === fetchedJob.id ? fetchedJob : job));
        queryClient.setQueryData(['jobs'], updatedJobs);
        setLoadingJobId(undefined);
      }
    } catch (err) {
      console.error('Error refetching job:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!jobs) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-end mb-5">
        <Button onClick={createNewJob}>+ Create</Button>
      </div>
      <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>
              <span className="sr-only">Image</span>
            </Table.HeadCell>
            <Table.HeadCell>Job ID</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>

            <Table.HeadCell>
              <span className="sr-only">Action</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {jobs.map((job) => (
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
                  <Button color="cyan" isProcessing={loadingJobId === job.id} onClick={() => refetchJob(job.id)}>
                    Refetch
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
