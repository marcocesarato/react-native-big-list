module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  moduleNameMapper: {
    '^react-native$': '<rootDir>/__mocks__/react-native.js',
  },
  transformIgnorePatterns: ['node_modules/(?!(@react-native|react-native)/)'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  collectCoverageFrom: [
    'lib/**/*.{js,jsx}',
    '!lib/index.js',
    '!lib/**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  coverageThreshold: {
    global: {
      branches: 45,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
};
