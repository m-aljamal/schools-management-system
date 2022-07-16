import {
  CreateLevelMutation,
  CreateLevelMutationVariables,
  FindLevelQuery,
  FindLevelsQuery,
  FindStudents_LevelsQuery,
  FindTechers_LevelsQuery,
  useCreateLevelMutation,
  useFindLevelQuery,
  useFindLevelsQuery,
  useFindStudents_LevelsQuery,
  useFindTechers_LevelsQuery,
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

function useTeachersList_levels() {
  const { client } = useAuthClient();
  const { archiveId } = useUrlParams();
  const { data } = useFindTechers_LevelsQuery<FindTechers_LevelsQuery, Error>(
    client(),
    {
      archiveId,
    }
  );

  return {
    teachers: data?.findTechers_levels || [],
  };
}

function useStudentsList_levels_divisions() {
  const { client } = useAuthClient();
  const { archiveId } = useUrlParams();
  const { data } = useFindStudents_LevelsQuery<FindStudents_LevelsQuery, Error>(
    client(),
    {
      archiveId,
    }
  );

  return {
    levels: data?.findStudents_levels || [],
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
  useCreateLevel,
  useLevelsList,
  useFindLevel,
  useTeachersList_levels,
  useStudentsList_levels_divisions,
};
