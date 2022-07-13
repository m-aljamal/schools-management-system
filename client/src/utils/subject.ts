import {
  FindSubjectsQuery,
  useFindSubjectsQuery,
} from "./../generated/generates";
import { useUrlParams } from "src/context/auth-context";
import { useAuthClient } from "src/context/auth-context";

function useSubjectsList() {
  const { client } = useAuthClient();
  const { levelId } = useUrlParams();
  const { data } = useFindSubjectsQuery<FindSubjectsQuery, Error>(client(), {
    levelId,
  });
  return {
    subjects: data?.findSubjects || [],
  };
}

export { useSubjectsList };
