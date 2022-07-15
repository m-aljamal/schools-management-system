import {
  CreateDivisionMutation,
  CreateDivisionMutationVariables,
  useCreateDivisionMutation,
  useFindDivisionsQuery,
  FindDivisionsQuery,
  useFindDivisionsStudentsQuery,
  FindDivisionsStudentsQuery,
} from "./../generated/generates";
import { useQueryClient } from "react-query";
import { useAuthClient, useUrlParams } from "src/context/auth-context";

function useCreateDivision() {
  const { client } = useAuthClient();
  const queryClent = useQueryClient();

  const { mutate } = useCreateDivisionMutation<Error>(client(), {
    onSuccess: (
      data: CreateDivisionMutation,
      _varibles: CreateDivisionMutationVariables,
      _context: unknown
    ) => {
      queryClent.invalidateQueries("findDivisions");
    },
    onError: (error: Error) => {
      console.error(error);
    },
    onSettled: () => queryClent.invalidateQueries("findDivisions"),
  });
  return { mutate };
}

function useDivisionsList() {
  const { client } = useAuthClient();
  const { levelId } = useUrlParams();
  const { data } = useFindDivisionsQuery<FindDivisionsQuery, Error>(client(), {
    levelId,
  });
  return {
    divisions: data?.findDivisions || [],
  };
}

function useDivision_students() {
  const { client } = useAuthClient();
  const { levelId } = useUrlParams();
  const { data } = useFindDivisionsStudentsQuery<
    FindDivisionsStudentsQuery,
    Error
  >(client(), {
    levelId,
    students: true,
  });
  return {
    divisions: data?.findDivisions || [],
  };
}
export { useCreateDivision, useDivisionsList, useDivision_students };
