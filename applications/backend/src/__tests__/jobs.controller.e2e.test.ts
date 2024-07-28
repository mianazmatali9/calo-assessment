import fs from 'fs';
import request from 'supertest';
import { Server } from 'http';

import { startServer } from '../app';
import { jobs } from './fixtures/jobs.fixtures';
import * as unsplashJobs from '../jobs/unsplash.job';

jest.mock('fs');
jest.mock('../workers/jobs.worker.ts')

describe('Jobs endpoints', () => {
  let server: Server;

  beforeAll(async () => {
    server = await startServer();
  });

  afterAll(async () => {
    server.close();
  });

  it('GET /jobs', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ jobs }));

    const response = await request(server).get('/jobs');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ jobs });
  });

  it('GET /jobs fails with 400 if something goes wrong', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw { message: 'Server error!' };
    });

    const response = await request(server).get('/jobs');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Server error!' });
  });

  it('GET /jobs/:id', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ jobs }));

    const job = jobs[2];
    const response = await request(server).get(`/jobs/${job.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(job);
  });

  it('GET /jobs/:id with invalid job ID', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ jobs }));

    const response = await request(server).get('/jobs/INVALID_ID');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Job not found' });
  });

  it('POST /jobs', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ jobs }));
    (fs.writeFileSync as jest.Mock).mockReturnValue(JSON.stringify({ jobs }));
    (unsplashJobs.simulateJobProcessing as jest.Mock) = jest.fn();

    const response = await request(server).post('/jobs');

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(fs.writeFileSync).toHaveBeenCalled();
    expect(unsplashJobs.simulateJobProcessing).toHaveBeenCalledWith(response.body.id);
  });

  it('POST /jobs with rate limiter', async () => {
    server.close();
    server = await startServer();
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ jobs }));
    (fs.writeFileSync as jest.Mock).mockReturnValue(JSON.stringify({ jobs }));
    (unsplashJobs.simulateJobProcessing as jest.Mock) = jest.fn();

    for (let i = 0; i < 50; i++) {
      await request(server).post('/jobs');
    }

    const response = await request(server).post('/jobs');

    expect(response.status).toBe(429);
    expect(response.body).toEqual({ message: 'Too many requests from this IP, please try again later.' });
  });
});
