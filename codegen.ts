import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.HASURA_PROJECT_ENDPOINT,
  documents: "*.{ts,tsx}",
  generates: {
    "graphql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
