import {
  FindExams_LevelQuery,
  useFindExams_LevelQuery,
} from "./../generated/generates";
import { useUrlParams } from "src/context/auth-context";
import { useAuthClient } from "src/context/auth-context";
function useExamsList_level() {
  const { client } = useAuthClient();
  const { archiveId, levelId } = useUrlParams();
  const { data } = useFindExams_LevelQuery<FindExams_LevelQuery, Error>(
    client(),
    {
      archiveId,
      levelId,
    }
  );
  return {
    exams: data?.findExams || [],
  };
}

export { useExamsList_level };
