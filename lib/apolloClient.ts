import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import fetch from "isomorphic-unfetch";
import { SubscriptionClient } from "subscriptions-transport-ws";

let accessToken: any = null;

const requestAccessToken = async () => {
  if (accessToken) return;

  const res = await fetch(`${process.env.APP_HOST}/api/session`);
  if (res.ok) {
    const json = await res.json();
    accessToken = json.accessToken;
  } else {
    accessToken = "public";
  }
};

// remove cached token on 401 from the server
//使わないのにエラるから以下コメントアウト

// const resetTokenLink = onError(({ networkError }) => {
//   if (
//     networkError &&
//     networkError.name === "ServerError" &&
//     networkError.statusCode === 401
//   ) {
//     accessToken = null;
//   }
// });

const createHttpLink = (headers: any) => {
  const httpLink = new HttpLink({
    uri: process.env.URI,
    credentials: "include",
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
  });
  return httpLink;
};

const wss: any = process.env.WSS;

const createWSLink = () => {
  return new WebSocketLink(
    new SubscriptionClient(wss, {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        await requestAccessToken(); // happens on the client
        return {
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        };
      },
    })
  );
};

export default function createApolloClient(initialState: any, headers: any) {
  const ssrMode = typeof window === "undefined";
  let link;
  if (ssrMode) {
    link = createHttpLink(headers);
  } else {
    link = createWSLink();
  }
  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore(initialState),
  });
}
