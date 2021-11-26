import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  useApolloClient,
} from "@apollo/client";
import config from "../config";

const client = new ApolloClient({
  link: new HttpLink({
    uri: config.API_URL,
    fetchOptions: {
      mode: "cors",
    },
  }),
  uri: config.API_URL,
  cache: new InMemoryCache(),
  credentials: "include",
});

export const useClient = () => {
  return useApolloClient(client);
};

export default client;
