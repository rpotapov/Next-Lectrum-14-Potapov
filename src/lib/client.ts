import { HttpLink } from "@apollo/client";
import {
  InMemoryCache,
  ApolloClient,
} from "@apollo/experimental-nextjs-app-support";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    }),
  });
});
