import {
  FindAbsentEmployeesByLevelQuery,
  FindTotalAbsentEmployeesQuery,
  useFindAbsentEmployeesByLevelQuery,
  useFindTotalAbsentEmployeesQuery,
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
function useTotalAbsentEmployee() {
  const { archiveId } = useUrlParams();
  const { client } = useAuthClient();
  const { data } = useFindTotalAbsentEmployeesQuery<
    FindTotalAbsentEmployeesQuery,
    Error
  >(client(), {
    archiveId,
  });

  return {
    totalAbsentEmployees: data?.findTotalAbsentEmployees || [],
  };
}
export {
  useAbsentEmployeesByLevelId,
  useTotalAbsentEmployee,
  useAbsentEmployees,
};
