import {
  Find_Levels_DivisionsQuery,
  Find_Levels_Divisions_EmployeesQuery,
  Find_Levels_Divisions_Employees_StudentsQuery,
  Find_Levels_Divisions_StudentsQuery,
  useFind_Levels_DivisionsQuery,
  useFind_Levels_Divisions_EmployeesQuery,
  useFind_Levels_Divisions_Employees_StudentsQuery,
  useFind_Levels_Divisions_StudentsQuery,
} from "./../generated/generates";
import { useAuthClient } from "src/context/auth-context";

function useLevels() {
  const { archiveName, client, projectId } = useAuthClient();
  const { data } = useFind_Levels_DivisionsQuery<
    Find_Levels_DivisionsQuery,
    Error
  >(client(), {
    archiveName,
    projectId,
  });
  return {
    levels: data?.find_levels_divisions || [],
  };
}

function useLevelsForAll() {
  const { archiveName, client, projectId } = useAuthClient();
  const { data } = useFind_Levels_Divisions_Employees_StudentsQuery<
    Find_Levels_Divisions_Employees_StudentsQuery,
    Error
  >(client(), {
    archiveName,
    projectId,
  });
  return {
    levels: data?.find_levels_divisions_employees_students || [],
  };
}

function useLevelsForStudents() {
  const { archiveName, client, projectId } = useAuthClient();
  const { data } = useFind_Levels_Divisions_StudentsQuery<
    Find_Levels_Divisions_StudentsQuery,
    Error
  >(client(), {
    archiveName,
    projectId,
  });
  return {
    levels: data?.find_levels_divisions_students || [],
  };
}

function useLevelsForEmployees() {
  const { archiveName, client, projectId } = useAuthClient();
  const { data } = useFind_Levels_Divisions_EmployeesQuery<
    Find_Levels_Divisions_EmployeesQuery,
    Error
  >(client(), {
    archiveName,
    projectId,
  });
  return {
    levels: data?.find_levels_divisions_employees || [],
  };
}

export {
  useLevels,
  useLevelsForAll,
  useLevelsForStudents,
  useLevelsForEmployees,
};
