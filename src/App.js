import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { AppRoutes } from "./AppRoutes";
import { NavigationBar } from "./components/NavigationBar";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYm9iLnNtaXRoQGVtYWlsLmNvbSIsIm5hbWUiOiJCb2IgU21pdGgiLCJpZCI6IjYyMWEyNTYxNzdmYzhlODdiZmJlN2FhOCJ9LCJpYXQiOjE2NDU4ODE3NDIsImV4cCI6MTY0NTg4ODk0Mn0.o19Q-mwc9afEJ5m3f8bGTSuyXlr-jdwWPjQ_5gEmO5M";
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <NavigationBar />
        <AppRoutes />
      </BrowserRouter>
    </ApolloProvider>
  );
};
