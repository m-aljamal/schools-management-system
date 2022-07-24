import {
  FindAbsentStudentsQuery,
  FindAbsentStudents_ByLevelQuery,
  FindTotalAbsentStudentsQuery,
  useFindAbsentStudentsQuery,
  useFindAbsentStudents_ByLevelQuery,
  useFindTotalAbsentStudentsQuery,
} from "./../generated/generates";
import { useUrlParams } from "src/context/auth-context";
import { useAuthClient } from "src/context/auth-context";

function useStudentAbsentLevel(date: string) {
  const { client } = useAuthClient();
  const { levelId, archiveId } = useUrlParams();
  const { data } = useFindAbsentStudentsQuery<FindAbsentStudentsQuery, Error>(
    client(),
    {
      date,
      archiveId,
      levelId,
    }
  );
  return {
    studentAbsent: data?.findAbsentStudents || [],
  };
}

function useStudentsAbsentList_by_level(date: string) {
  const { client } = useAuthClient();
  const { archiveId } = useUrlParams();
  const { data } = useFindAbsentStudents_ByLevelQuery<
    FindAbsentStudents_ByLevelQuery,
    Error
  >(client(), {
    archiveId,
    date,
  });
  return {
    studentAbsent: data?.findAbsentStudents_byLevel || [],
  };
}

function useTotalStudentAbsent() {
  const { client } = useAuthClient();
  const { archiveId } = useUrlParams();
  const { data } = useFindTotalAbsentStudentsQuery<
    FindTotalAbsentStudentsQuery,
    Error
  >(client(), {
    archiveId,
  });
  return {
    totalAbsentStudents: data?.findTotalAbsentStudents || [],
  };
}
export {
  useStudentAbsentLevel,
  useStudentsAbsentList_by_level,
  useTotalStudentAbsent,
};
