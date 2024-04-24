import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { apolloClient } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
