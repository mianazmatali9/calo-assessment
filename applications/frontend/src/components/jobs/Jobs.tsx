import { Button, Spinner, Table } from 'flowbite-react';

import { useJobsList } from '../../hooks/useJobsList';
import { useJobCreate } from '../../hooks/useJobCreate';
import { showNotification } from '../shared/showNotification';
import JobRow from './JobRow';

export const Jobs = (): JSX.Element | null => {
  const { isLoading, data: jobs } = useJobsList();
  const { mutateAsync: createJob } = useJobCreate();

  const createNewJob = () => {
    createJob().catch((error) => {
      showNotification({ message: error.message, type: 'error' });
    });
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  if (!jobs) {
    return null;
  }

  return (
    <>
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
              <JobRow key={job.id} job={job} />
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};
