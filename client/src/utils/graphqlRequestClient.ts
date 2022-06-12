import { GraphQLClient } from "graphql-request";
export default function graphqlRequestClient() {
  return new GraphQLClient("http://localhost:3001/graphql", {
    credentials: "include",
  });
}
