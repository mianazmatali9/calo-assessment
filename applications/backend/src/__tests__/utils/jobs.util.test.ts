import fs from 'fs';
import path from 'path';
import { getJobsList, updateJobsList } from '../../utils/jobs';
import { jobs } from '../fixtures/jobs.fixtures';

jest.mock('fs');

const jobsFile = path.join(__dirname, '../../../jobs.db.json');

describe('getJobsList', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a new file if it does not exist and return an empty array', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ jobs: [] }));

    const jobsList = getJobsList();

    expect(fs.existsSync).toHaveBeenCalledWith(jobsFile);
    expect(fs.writeFileSync).toHaveBeenCalledWith(jobsFile, JSON.stringify({ jobs: [] }));
    expect(fs.readFileSync).toHaveBeenCalledWith(jobsFile);
    expect(jobsList).toEqual([]);
  });

  it('should return the list of jobs if the file exists', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify({ jobs }));

    const jobsList = getJobsList();

    expect(fs.existsSync).toHaveBeenCalledWith(jobsFile);
    expect(fs.readFileSync).toHaveBeenCalledWith(jobsFile);
    expect(jobs).toEqual(jobsList);
  });
});

describe('updateJobsList', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a new file if it does not exist and return an empty array', () => {
    (fs.writeFileSync as jest.Mock).mockReturnValue(JSON.stringify({ jobs: [] }));

    updateJobsList(jobs);

    expect(fs.writeFileSync).toHaveBeenCalledWith(jobsFile, JSON.stringify({ jobs }, null, 2));
  });
});
