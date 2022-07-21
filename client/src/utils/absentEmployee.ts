import {
  FindAbsentEmployeesByLevelQuery,
  useFindAbsentEmployeesByLevelQuery,
} from "./../generated/generates";
import { useAuthClient } from "src/context/auth-context";
import { useUrlParams } from "src/context/auth-context";

function useAbsentEmployeesByLevelId(date: string) {
  const { archiveId, levelId } = useUrlParams();
  const { client } = useAuthClient();
  const { data } = useFindAbsentEmployeesByLevelQuery<
    FindAbsentEmployeesByLevelQuery,
    Error
  >(client(), {
    archiveId,
    levelId,
    date,
  });
  return {
    absentEmployees: data?.findAbsentEmployees || [],
  };
}

function useAbsentEmployees(date: string) {
  const { archiveId } = useUrlParams();
  const { client } = useAuthClient();
  const { data } = useFindAbsentEmployeesByLevelQuery<
    FindAbsentEmployeesByLevelQuery,
    Error
  >(client(), {
    archiveId,
    date,
  });
  return {
    absentEmployees: data?.findAbsentEmployees || [],
  };
}
function useTotalAbsentEmployee() {}
export {
  useAbsentEmployeesByLevelId,
  useTotalAbsentEmployee,
  useAbsentEmployees,
};
