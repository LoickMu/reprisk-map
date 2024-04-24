import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: new HttpLink({
      uri: "https://countries.trevorblades.com/",
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}

export const apolloClient = createApolloClient();
