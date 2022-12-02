import "@/styles/globals.scss";

import type { AppProps } from "next/app";
import { usePageView } from "../usePageView";

export default function App({ Component, pageProps }: AppProps) {
  usePageView();
  return <Component {...pageProps} />;
}

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://your.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
