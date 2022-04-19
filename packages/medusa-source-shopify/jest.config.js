module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.[jt]s?$": `../../jest-transformer.js`,
  },
  moduleFileExtensions: [`js`, `jsx`, `ts`, `tsx`, `json`],
}
