const pathIgnorePatterns = ['<rootDir>/.circleci/', '<rootDir>/node_modules/'];

module.exports = {
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.(js?|ts?)$',
  transform: {
    '^.+\\.(js)?$': 'babel-jest',
  },
  testPathIgnorePatterns: pathIgnorePatterns,
  moduleFileExtensions: ['js', 'ts'],
  preset: 'ts-jest',
};
