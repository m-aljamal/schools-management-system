import {
  CreateLevelMutation,
  CreateLevelMutationVariables,
  FindLevelQuery,
  FindLevelsQuery,
  Find_Levels_DivisionsQuery,
  Find_Levels_Divisions_EmployeesQuery,
  Find_Levels_Divisions_Employees_StudentsQuery,
  Find_Levels_Divisions_StudentsQuery,
  useCreateLevelMutation,
  useFindLevelQuery,
  useFindLevelsQuery,
  useFind_Levels_DivisionsQuery,
  useFind_Levels_Divisions_EmployeesQuery,
  useFind_Levels_Divisions_Employees_StudentsQuery,
  useFind_Levels_Divisions_StudentsQuery,
} from "./../generated/generates";
import { useAuthClient, useUrlParams } from "src/context/auth-context";
import { useQueryClient } from "react-query";

function useLevelsList() {
  const { archiveId } = useUrlParams();
  const { client } = useAuthClient();
  const { data } = useFindLevelsQuery<FindLevelsQuery, Error>(client(), {
    archiveId,
  });
  return {
    levels: data?.findLevels || [],
  };
}

function useFindLevel() {
  const { client } = useAuthClient();
  const { levelId } = useUrlParams();
  const { data } = useFindLevelQuery<FindLevelQuery, Error>(client(), {
    levelId,
  });
  return {
    level: data?.findLevel || null,
  };
}

function useLevels() {
  const { client } = useAuthClient();
  const { archiveId, projectId } = useUrlParams();
  const { data } = useFind_Levels_DivisionsQuery<
    Find_Levels_DivisionsQuery,
    Error
  >(client(), {
    archiveId,
    projectId,
  });
  return {
    levels: data?.find_levels_divisions || [],
  };
}

function useLevelsForAll() {
  const { client } = useAuthClient();
  const { archiveId, projectId } = useUrlParams();

  const { data } = useFind_Levels_Divisions_Employees_StudentsQuery<
    Find_Levels_Divisions_Employees_StudentsQuery,
    Error
  >(client(), {
    archiveId,
    projectId,
  });
  return {
    levels: data?.find_levels_divisions_employees_students || [],
  };
}

function useLevelsForStudents() {
  const { client } = useAuthClient();
  const { archiveId, projectId } = useUrlParams();

  const { data } = useFind_Levels_Divisions_StudentsQuery<
    Find_Levels_Divisions_StudentsQuery,
    Error
  >(client(), {
    archiveId,
    projectId,
  });
  return {
    levels: data?.find_levels_divisions_students || [],
  };
}

function useLevelsForEmployees() {
  const { client } = useAuthClient();
  const { archiveId, projectId } = useUrlParams();

  const { data } = useFind_Levels_Divisions_EmployeesQuery<
    Find_Levels_Divisions_EmployeesQuery,
    Error
  >(client(), {
    archiveId,
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
      queryClent.invalidateQueries("findLevels");
    },
    onError: (error: Error) => {
      console.error(error);
    },
    onSettled: () => queryClent.invalidateQueries("findLevels"),
  });
  return { mutate };
}

export {
  useLevels,
  useLevelsForAll,
  useLevelsForStudents,
  useLevelsForEmployees,
  useCreateLevel,
  useLevelsList,
  useFindLevel,
};
