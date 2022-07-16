import {
  FindStudentQuery,
  FindStudents_DivisionList_ByLevelQuery,
  useFindStudentQuery,
  useFindStudents_DivisionList_ByLevelQuery,
} from "./../generated/generates";
import { useUrlParams } from "src/context/auth-context";
import { useAuthClient } from "src/context/auth-context";

function useStudentsList_divisionList_byLevel() {
  const { client } = useAuthClient();
  const { levelId } = useUrlParams();
  const { data } = useFindStudents_DivisionList_ByLevelQuery<
    FindStudents_DivisionList_ByLevelQuery,
    Error
  >(client(), {
    levelId,
  });
  return {
    divisions: data?.findStudents_division || [],
  };
}

function useStudent() {
  const { client } = useAuthClient();
  const { studentId, archiveId } = useUrlParams();
  const { data } = useFindStudentQuery<FindStudentQuery, Error>(client(), {
    archiveId,
    studentId,
  });
  return {
    student: data?.findStudent || null,
  };
}

export { useStudentsList_divisionList_byLevel, useStudent };
