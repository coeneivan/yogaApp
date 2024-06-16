"use client";
import { makeClient } from "@/lib/apolloClient";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}