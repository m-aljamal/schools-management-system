import {
  FindSemestersQuery,
  useFindSemestersQuery,
} from "./../generated/generates";
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
