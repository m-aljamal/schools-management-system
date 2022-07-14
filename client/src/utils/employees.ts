import { useParams } from "react-router-dom";
import { useAuthClient, useUrlParams } from "src/context/auth-context";
import {
  FindEmployeeQuery,
  FindManagersQuery,
  FindTeachers_DivisionsQuery,
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

  const { employeeId } = useParams();
  const { data } = useFindEmployeeQuery<FindEmployeeQuery, Error>(client(), {
    id: employeeId as string,
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
export {
  // useEmployees,
  useEmployee,
  useTeachersList_divisions,
  useMangersList,
};
