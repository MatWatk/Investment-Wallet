module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/tests/**/*.{ts,tsx}', '**/?(*.)+(spec|test).{ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.cjs'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.test.json' }],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpe?g|webp)$': '<rootDir>/src/test/fileMock.ts',
  },
};
