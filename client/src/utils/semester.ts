import { FindSemestersQuery } from "./../generated/generates";
import { GraphQLClient } from "graphql-request";
import { useAuthClient, useUrlParams } from "src/context/auth-context";

function useSemesterList() {
  const { client } = useAuthClient();
  const { archiveId } = useUrlParams();

  const { data } = useFindSemestersQuery<FindSemestersQuery, Error>(client(), {
    archiveId,
  });
  return {
    semesters: data?.findSemesters || [],
  };
}

export { useSemesterList };
function useFindSemestersQuery<T, U>(
  arg0: GraphQLClient,
  arg1: { archiveId: string }
): { data: any } {
  throw new Error("Function not implemented.");
}
