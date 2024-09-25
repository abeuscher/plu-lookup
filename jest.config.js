// jest.config.js

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Path to your Next.js app directory
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
