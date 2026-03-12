import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: [
    "<rootDir>/__tests__/**/*.test.{ts,tsx}",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          esModuleInterop: true,
          moduleResolution: "node",
        },
      },
    ],
  },
  moduleNameMapper: {
    // Handle CSS modules and static assets
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.ts",
    "\\.(jpg|jpeg|png|gif|webp|svg|mp4|mov|avi)$": "<rootDir>/__mocks__/fileMock.ts",
    // Path alias
    "^@/(.*)$": "<rootDir>/$1",
    // Mock next/link and next/image
    "^next/link$": "<rootDir>/__mocks__/next/link.tsx",
    "^next/image$": "<rootDir>/__mocks__/next/image.tsx",
    "^next/navigation$": "<rootDir>/__mocks__/next/navigation.ts",
  },
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "!app/**/*.d.ts",
    "!app/layout.tsx",
    "!app/**/page.tsx",
  ],
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testTimeout: 15000,
};

export default config;
