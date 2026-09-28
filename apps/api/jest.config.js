module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testRegex: ".*\\.test\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": ["ts-jest", { tsconfig: { isolatedModules: true } }],
  },
  collectCoverageFrom: ["**/*.(t|j)s", "!**/*.test.ts", "!**/*.e2e.test.ts"],
  coverageDirectory: "../coverage",
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 25,
      lines: 20,
      statements: 20,
    },
  },
  testEnvironment: "node",
};
