import {
  CreateLevelMutation,
  CreateLevelMutationVariables,
  Find_Levels_DivisionsQuery,
  Find_Levels_Divisions_EmployeesQuery,
  Find_Levels_Divisions_Employees_StudentsQuery,
  Find_Levels_Divisions_StudentsQuery,
  useCreateLevelMutation,
  useFind_Levels_DivisionsQuery,
  useFind_Levels_Divisions_EmployeesQuery,
  useFind_Levels_Divisions_Employees_StudentsQuery,
  useFind_Levels_Divisions_StudentsQuery,
} from "./../generated/generates";
import { useAuthClient, useUrlParams } from "src/context/auth-context";
import { useQueryClient } from "react-query";

function useLevels() {
  const { client } = useAuthClient();
  const { archiveName, projectId } = useUrlParams();
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
  const { client } = useAuthClient();
  const { archiveName, projectId } = useUrlParams();

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
  const { client } = useAuthClient();
  const { archiveName, projectId } = useUrlParams();

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
  const { client } = useAuthClient();
  const { archiveName, projectId } = useUrlParams();

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

function useCreateLevel() {
  const { client } = useAuthClient();
  const queryClent = useQueryClient();

  const { mutate } = useCreateLevelMutation<Error>(client(), {
    onSuccess: (
      data: CreateLevelMutation,
      _varibles: CreateLevelMutationVariables,
      _context: unknown
    ) => {
      queryClent.invalidateQueries("find_levels_divisions");
    },
    onError: (error: Error) => {
      console.error(error);
    },
    onSettled: () => queryClent.invalidateQueries("find_levels_divisions"),
  });
  return { mutate };
}

export {
  useLevels,
  useLevelsForAll,
  useLevelsForStudents,
  useLevelsForEmployees,
  useCreateLevel,
};
