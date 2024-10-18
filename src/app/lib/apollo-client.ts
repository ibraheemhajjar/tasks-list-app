import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
   uri: "https://asktask-api.stagelab.co.uk/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
   if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
         console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
   if (networkError) console.log(`[Network error]: ${networkError}`);
});

export function createApolloClient() {
   return new ApolloClient({
      link: from([errorLink, httpLink]),
      cache: new InMemoryCache(),
   });
}
