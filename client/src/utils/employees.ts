import { useQueryClient } from "react-query";
import { useAuthClient, useUrlParams } from "src/context/auth-context";
import {
  CreateEmployeeMutation,
  CreateEmployeeMutationVariables,
  CreateProjectMutation,
  FindEmployeeQuery,
  FindManagersQuery,
  FindTeachers_DivisionsQuery,
  Role,
  useCreateEmployeeMutation,
  useFindEmployeeQuery,
  useFindManagersQuery,
  useFindTeachers_DivisionsQuery,
} from "./../generated/generates";

// function useEmployees() {
//   const { client } = useAuthClient();
//   const { archiveId } = useUrlParams();

//   const { data } = useFindEmployeesQuery<FindEmployeesQuery, Error>(client(), {
//     archiveId,
//     excludeJobTitle: Role.Teacher,
//   });
//   return {
//     employees: data?.findEmployees || [],
//   };
// }

function useEmployee() {
  const { client } = useAuthClient();

  const { employeeId, archiveId } = useUrlParams();
  const { data } = useFindEmployeeQuery<FindEmployeeQuery, Error>(client(), {
    id: employeeId,
    archiveId,
  });
  return {
    employee: data?.findEmployee,
  };
}

function useTeachersList_divisions() {
  const { client } = useAuthClient();
  const { archiveId, levelId } = useUrlParams();
  const { data } = useFindTeachers_DivisionsQuery<
    FindTeachers_DivisionsQuery,
    Error
  >(client(), {
    archiveId,
    levelId,
  });
  return {
    teachers: data?.findTeachers || [],
  };
}

function useMangersList() {
  const { client } = useAuthClient();
  const { archiveId } = useUrlParams();
  const { data } = useFindManagersQuery<FindManagersQuery, Error>(client(), {
    archiveId,
  });
  return {
    managers: data?.findManagers || [],
  };
}

function useCreateEmployee() {
  const { client } = useAuthClient();
  const queryClient = useQueryClient();

  const { mutate } = useCreateEmployeeMutation<Error>(client(), {
    onSuccess: (
      data: CreateEmployeeMutation,
      _varibles: CreateEmployeeMutationVariables,
      _context: unknown
    ) => {
      queryClient.invalidateQueries(
        `${
          data.createEmployee.role === Role.Teacher
            ? "findTechers_levels"
            : "findManagers"
        }`
      );
    },
    onError: (error: Error) => {
      console.error(error);
    },
    onSettled: () => queryClient.invalidateQueries("findTechers_levels"),
  });
}

export {
  // useEmployees,
  useEmployee,
  useTeachersList_divisions,
  useMangersList,
  useCreateEmployee,
  useCreateEmployeeMutation,
};
