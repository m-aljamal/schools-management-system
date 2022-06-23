import { GraphQLClient } from "graphql-request";

export default function graphqlRequestClient(token?: string) {
  return new GraphQLClient("http://localhost:3001/graphql", {
    credentials: "include",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
