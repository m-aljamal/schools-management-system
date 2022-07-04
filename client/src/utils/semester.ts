import { useAuthClient } from "src/context/auth-context";
import {
  FindSemestersQuery,
  useFindSemestersQuery,
} from "src/generated/generates";
function useSemesterList() {
  const { client, archiveId } = useAuthClient();
  console.log(archiveId);
  
  const { data } = useFindSemestersQuery<FindSemestersQuery, Error>(client(), {
    archiveId,
  });
  return {
    semesters: data?.findSemesters || [],
  };
}

export { useSemesterList };
