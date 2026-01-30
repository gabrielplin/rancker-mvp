import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './'
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.ts.{ts,tsx}',
    '!<rootDir>/src/**/main/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*{.interface,.enum,.styles,.type}.ts',
    '!**/icons/**',
    '!<rootDir>/**/*.stories.{js,jsx,ts,tsx}',
    '!<rootDir>/**/index.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!<rootDir>/src/app/**/*.{ts,tsx}',
    '!<rootDir>/src/styles/**/*.{ts,tsx}'
  ],
  coverageReporters: ['text', 'lcov']
};

export default createJestConfig(customJestConfig);
