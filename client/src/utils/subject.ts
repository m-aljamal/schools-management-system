import {
  FindSubjectsQuery,
  FindSubjects_By_LevelsQuery,
  useFindSubjectsQuery,
  useFindSubjects_By_LevelsQuery,
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

function useSubjects_by_level() {
  const { client } = useAuthClient();
  const { archiveId } = useUrlParams();
  const { data } = useFindSubjects_By_LevelsQuery<FindSubjects_By_LevelsQuery>(
    client(),
    {
      archiveId,
    }
  );
  return {
    levels: data?.findSubjects_byLevel || [],
  };
}

export { useSubjectsList, useSubjects_by_level };
