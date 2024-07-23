import './src/__test__/utils/setupAuth';

import { Server } from 'http';
import { matchers } from 'jest-json-schema';
import zodMatchers from 'jest-zod';
import { runSeeders } from 'typeorm-extension';

import { startServer } from './src/app';
import { AppDataSource, disconnectFromDatabase } from './src/database/data-source';

expect.extend(matchers);
expect.extend(zodMatchers);

declare global {
  // eslint-disable-next-line no-var
  var server: Server;
}

beforeAll(async () => {
  const server = await startServer();
  global.server = server;

  await runSeeders(AppDataSource, {
    seeds: ['src/seeding/seeders/prerequisite.seeder.ts'],
    factories: ['src/seeding/factories/*.factory.ts'],
  });
}, 30000);

afterAll(async () => {
  await Promise.all([disconnectFromDatabase(), server.close()]);
});

export { server };
