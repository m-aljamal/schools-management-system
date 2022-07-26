import {
  FindExams_LevelQuery,
  FindSubjects_For_GradesQuery,
  useFindExams_LevelQuery,
  useFindSubjects_For_GradesQuery,
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

function useGradeList_by_subject({
  semesterId,
  levelId,
}: {
  semesterId: string;
  levelId: string;
}) {
  const { client } = useAuthClient();

  const { data } = useFindSubjects_For_GradesQuery<
    FindSubjects_For_GradesQuery,
    Error
  >(client(), {
    levelId,
    semesterId,
  });
  return {
    subject: data?.findSubjects_for_grades || [],
  };
}

export { useExamsList_level, useGradeList_by_subject };
