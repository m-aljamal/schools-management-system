import { useParams } from "react-router-dom";
import {
  FindEmployeesQuery,
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

export { useEmployees };
