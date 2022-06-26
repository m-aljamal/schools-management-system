import { useParams } from "react-router-dom";
import { useAuthClient } from "src/context/auth-context";
import {
  FindEmployeeQuery,
  FindEmployeesQuery,
  useFindEmployeeQuery,
  useFindEmployeesQuery,
} from "./../generated/generates";
import graphqlRequestClient from "./graphqlRequestClient";

function useEmployees() {
  const { archiveName, client } = useAuthClient();

  const { data } = useFindEmployeesQuery<FindEmployeesQuery, Error>(client(), {
    archiveName: archiveName as string,
    excludeJobTitle: "TEACHER",
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
