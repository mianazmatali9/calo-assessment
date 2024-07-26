import axios from 'axios';
import { startCase } from 'lodash-es';
import userEvents from '@testing-library/user-event';

import { render, screen, waitFor } from 'test-utils/render';
import { jobs } from 'components/fixtures/jobs.fixture';

import { Jobs } from './Jobs';

describe('Jobs Component', () => {
  it('should render Loading Spinner when loading', () => {
    (axios.get as jest.Mock).mockResolvedValue({ status: 200, data: { jobs } });
    render(<Jobs />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should render data correctly', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ status: 200, data: { jobs } });

    render(<Jobs />);

    jobs.forEach((job) => {
      expect(screen.getByText(job.id)).toBeInTheDocument();
      expect(screen.getByText(startCase(job.status))).toBeInTheDocument();
    });
  });

  it('should render a toast notification error if API fails', async () => {
    const SERVER_ERROR = 'Error from server!';
    (axios.get as jest.Mock).mockRejectedValue({ status: 400, response: { data: { message: SERVER_ERROR } } });

    render(<Jobs />);

    await waitFor(() => {
      expect(screen.getByText(SERVER_ERROR)).toBeInTheDocument();
    });
  });

  it('should render a create button', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ status: 200, data: { jobs } });

    render(<Jobs />);

    expect(screen.getByRole('button', { name: '+ Create' })).toBeInTheDocument();
  });

  it('should validate create endpoint to be called', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ status: 200, data: { jobs } });
    (axios.post as jest.Mock).mockResolvedValue({ status: 201, data: { id: 'NEW_JOB_ID' } });


    render(<Jobs />);

    const createButton = screen.getByRole('button', { name: '+ Create' });
    userEvents.click(createButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });
});
