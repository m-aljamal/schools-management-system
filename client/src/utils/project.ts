import { useQueryClient } from "react-query";
import {
  useFindProjectsQuery,
  CreateProjectMutation,
  CreateProjectMutationVariables,
  FindProjectsQuery,
  useCreateProjectMutation,
} from "src/generated/generates";
import graphqlRequestClient from "./graphqlRequestClient";

function useProjectList() {
  const { data, error } = useFindProjectsQuery<FindProjectsQuery, Error>(
    graphqlRequestClient()
  );

  return {
    projects: data?.findProjects || [],
  };
}

function useCreateProject() {
  const queryClent = useQueryClient();
  const { mutate } = useCreateProjectMutation<Error>(graphqlRequestClient(), {
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
