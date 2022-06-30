import {
  CreateDivisionMutation,
  CreateDivisionMutationVariables,
  useCreateDivisionMutation,
} from "./../generated/generates";
import { useQueryClient } from "react-query";
import { useAuthClient } from "src/context/auth-context";

function useCreateDivision() {
  const { client } = useAuthClient();
  const queryClent = useQueryClient();

  const { mutate } = useCreateDivisionMutation<Error>(client(), {
    onSuccess: (
      data: CreateDivisionMutation,
      _varibles: CreateDivisionMutationVariables,
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

export { useCreateDivision };
