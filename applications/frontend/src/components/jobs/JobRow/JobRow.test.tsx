import axios from 'axios';
import { startCase } from 'lodash-es';
import { Table } from 'flowbite-react';

import { render, screen } from 'test-utils/render';
import { jobs } from 'components/fixtures/jobs.fixture';
import { Job } from 'types/job.type';

import { JobRow } from './JobRow';

describe('JobRow Component', () => {
  it('should render data correctly', () => {
    jobs.forEach((job) => {
      render(
        <Table>
          <Table.Body>
            <JobRow job={job as Job} />
          </Table.Body>
        </Table>,
      );
  
      expect(screen.getByText(job.id)).toBeInTheDocument();
      expect(screen.getByText(startCase(job.status))).toBeInTheDocument();
    });
  });

  it('should render image if job is resolved', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ status: 200, data: { jobs } });

    render(
      <Table>
        <Table.Body>
          <JobRow job={jobs[0] as Job} />
        </Table.Body>
      </Table>,
    );

    expect(screen.getByAltText(`${jobs[0].result?.slug}`)).toBeInTheDocument();
  });

  it('should not render image if job is pending', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ status: 200, data: { jobs } });

    render(
      <Table>
        <Table.Body>
          <JobRow job={jobs[1] as Job} />
        </Table.Body>
      </Table>,
    );

    expect(screen.queryByAltText(`${jobs[1].result?.slug}`)).not.toBeInTheDocument();
  });
});
