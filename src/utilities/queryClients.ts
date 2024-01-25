import { QueryClient, QueryCache } from "react-query";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getGitLabPATValue } from "./tokenValidationUtilities/getters/getGitLabPATValue";
import { GIT_API_URL } from "./constants";

const httpLink = createHttpLink({
  uri: GIT_API_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getGitLabPATValue();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const clientGitLab = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const clientAtlassian = new QueryClient({
  queryCache: new QueryCache(),
});
