import { useParams } from "react-router-dom";
import {
  FindEmployeeQuery,
  FindEmployeesQuery,
  useFindEmployeeQuery,
  useFindEmployeesQuery,
} from "./../generated/generates";
import graphqlRequestClient from "./graphqlRequestClient";

function useEmployees() {
  const { archiveName } = useParams();

  const { data } = useFindEmployeesQuery<FindEmployeesQuery, Error>(
    graphqlRequestClient(),
    {
      archiveName: archiveName as string,
      excludeJobTitle: "TEACHER",
    }
  );
  return {
    employees: data?.findEmployees || [],
  };
}

function useEmployee() {
  const { employeeId } = useParams();
  const { data } = useFindEmployeeQuery<FindEmployeeQuery, Error>(
    graphqlRequestClient(),
    {
      id: employeeId as string,
    }
  );
  return {
    employee: data?.findEmployee,
  };
}
export { useEmployees, useEmployee };
