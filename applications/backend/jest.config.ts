// eslint-disable-next-line import/no-anonymous-default-export
export default {
  displayName: '@calo/backend', // The display name for the package in the test output
  preset: 'ts-jest',
  // testRegex: '(/src/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  testEnvironment: 'jest-environment-node', // Use the Node.js environment for testing
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {},
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testTimeout: 10000,
};
