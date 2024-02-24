module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: [ "<rootDir>" ],
  moduleNameMapper: {
    "^(\\.\\.?\\/.+)\\.js$": "$1",
  },
}
