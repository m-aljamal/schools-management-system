import { useQueryClient } from "react-query";
import { useAuthClient } from "src/context/auth-context";
import {
  useFindProjectsQuery,
  CreateProjectMutation,
  CreateProjectMutationVariables,
  FindProjectsQuery,
  useCreateProjectMutation,
} from "src/generated/generates";

function useProjectList() {
  const { client } = useAuthClient();
  

  const { data, error } = useFindProjectsQuery<FindProjectsQuery, Error>(
    client()
  );

  return {
    projects: data?.findProjects || [],
  };
}

function useCreateProject() {
  const queryClent = useQueryClient();
  const { client } = useAuthClient();

  const { mutate } = useCreateProjectMutation<Error>(client(), {
    onSuccess: (
      data: CreateProjectMutation,
      _varibles: CreateProjectMutationVariables,
      _context: unknown
    ) => {
      queryClent.invalidateQueries("findProjects");
    },
    onError: (error: Error) => {
      console.error(error);
    },
    onSettled: () => queryClent.invalidateQueries("findProjects"),
  });

  return { mutate };
}
export { useProjectList, useCreateProject };
