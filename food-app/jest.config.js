module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.jsx?$': 'babel-jest', // Add this line to include JSX transformation
    },
    transformIgnorePatterns: [
      '/node_modules/',
    ],
    // Add the following line to configure Babel presets
    babelConfig: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  };