import { FindStudentsQuery } from "./../generated/generates";
import { useUrlParams } from "src/context/auth-context";
import { useAuthClient } from "src/context/auth-context";
import { useFindStudentsQuery } from "src/generated/generates";

function useStudnetsList(isLevels?: boolean) {
  const { client } = useAuthClient();
  const { archiveId, levelId } = useUrlParams();
  const { data } = useFindStudentsQuery<FindStudentsQuery, Error>(client(), {
    archiveId,
    levelId: isLevels ? levelId : undefined,
  });
  return {
    students: data?.findStudents || [],
  };
}

export { useStudnetsList };
