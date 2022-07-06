import { useParams } from "react-router-dom";
import { useAuthClient, useUrlParams } from "src/context/auth-context";
import {
  FindEmployeeQuery,
  FindEmployeesQuery,
  Role,
  useFindEmployeeQuery,
  useFindEmployeesQuery,
} from "./../generated/generates";

function useEmployees() {
  const { client } = useAuthClient();
  const { archiveId } = useUrlParams();

  const { data } = useFindEmployeesQuery<FindEmployeesQuery, Error>(client(), {
    archiveId,
    excludeJobTitle: Role.Teacher,
  });
  return {
    employees: data?.findEmployees || [],
  };
}

function useEmployee() {
  const { client } = useAuthClient();

  const { employeeId } = useParams();
  const { data } = useFindEmployeeQuery<FindEmployeeQuery, Error>(client(), {
    id: employeeId as string,
  });
  return {
    employee: data?.findEmployee,
  };
}
export { useEmployees, useEmployee };
