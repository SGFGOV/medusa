module.exports = {
  moduleFileExtensions: ["js", "json", "ts", "d.ts"],
  preset: "ts-jest",
  rootDir: "src",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  verbose: true,
  transformIgnorePatterns: ["/node_modules/"],
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageReporters: ["json-summary", "text", "lcov"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
}
