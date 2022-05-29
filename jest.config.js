
module.exports = {
  // stop after first failing test
  bail: true,
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.test.ts',
  ],
  'collectCoverageFrom': [
    'src/**/*.{ts,js}',
    '!**/__tests__/**/*.{ts,js}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
}
