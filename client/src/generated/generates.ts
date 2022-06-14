import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AbsentEmployee = {
  __typename?: 'AbsentEmployee';
  date: Scalars['DateTime'];
  employee: Employee;
  employeeId: Scalars['String'];
  id: Scalars['String'];
  semester: Semester;
  semesterId: Scalars['String'];
};

export type AbsentEmployeeInput = {
  date: Scalars['DateTime'];
  employeeId: Scalars['String'];
  semesterId: Scalars['String'];
};

export type AbsentStudent = {
  __typename?: 'AbsentStudent';
  date: Scalars['DateTime'];
  id: Scalars['String'];
  semester: Semester;
  semesterId: Scalars['String'];
  student: Student;
  studentId: Scalars['String'];
};

export type AbsentStudentInput = {
  date: Scalars['DateTime'];
  semesterId: Scalars['String'];
  studentId: Scalars['String'];
};

export type Archive = {
  __typename?: 'Archive';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  levels: Array<Level>;
  name: Scalars['String'];
  project: Project;
  projectId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ArchiveInput = {
  name: Scalars['String'];
  projectId: Scalars['String'];
};

export type Division = {
  __typename?: 'Division';
  employees?: Maybe<Array<Student>>;
  id: Scalars['String'];
  level: Level;
  levelId: Scalars['String'];
  name: Scalars['String'];
  students: Array<Student>;
};

export type DivisionInput = {
  levelId: Scalars['String'];
  name: Scalars['String'];
};

export type Employee = {
  __typename?: 'Employee';
  absentEmployees: Array<AbsentEmployee>;
  divisions: Array<Division>;
  id: Scalars['String'];
  levels: Array<Level>;
  name: Scalars['String'];
};

export type EmployeeInput = {
  divisions: Array<Scalars['String']>;
  levels: Array<Scalars['String']>;
  name: Scalars['String'];
};

export type Level = {
  __typename?: 'Level';
  archive: Archive;
  archiveId: Scalars['String'];
  divisions?: Maybe<Array<Division>>;
  employees?: Maybe<Array<Student>>;
  id: Scalars['String'];
  name: Scalars['String'];
  students?: Maybe<Array<Student>>;
};

export type LevelInput = {
  archiveId: Scalars['String'];
  name: Scalars['String'];
};

export type LevelUpdateInput = {
  archiveId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAbsentEmployee: AbsentEmployee;
  createAbsentStudent: AbsentStudent;
  createArchive: Archive;
  createDivision: Division;
  createEmployee: Employee;
  createLevel: Level;
  createProject: Project;
  createSemester: Semester;
  createStudent: Student;
  updateLevel: Level;
};


export type MutationCreateAbsentEmployeeArgs = {
  input: AbsentEmployeeInput;
};


export type MutationCreateAbsentStudentArgs = {
  input: AbsentStudentInput;
};


export type MutationCreateArchiveArgs = {
  input: ArchiveInput;
};


export type MutationCreateDivisionArgs = {
  input: DivisionInput;
};


export type MutationCreateEmployeeArgs = {
  input: EmployeeInput;
};


export type MutationCreateLevelArgs = {
  input: LevelInput;
};


export type MutationCreateProjectArgs = {
  input: ProjectInput;
};


export type MutationCreateSemesterArgs = {
  input: SemesterInput;
};


export type MutationCreateStudentArgs = {
  input: StudentInput;
};


export type MutationUpdateLevelArgs = {
  id: Scalars['String'];
  input: LevelUpdateInput;
};

export type Project = {
  __typename?: 'Project';
  archives?: Maybe<Array<Archive>>;
  createdAt: Scalars['DateTime'];
  current_archive_name: Scalars['String'];
  id: Scalars['String'];
  name_ar: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProjectInput = {
  current_archive_name: Scalars['String'];
  name_ar: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  absentStudents: Array<AbsentStudent>;
  findAbsentEmployees: Array<AbsentEmployee>;
  findAllArchives: Array<Archive>;
  findArchive: Archive;
  findDivisions: Array<Division>;
  findEmployee: Array<Employee>;
  findLevels: Array<Level>;
  findProjects: Array<Project>;
  findSemesters: Array<Semester>;
  findStudents: Array<Student>;
};


export type QueryFindArchiveArgs = {
  name: Scalars['String'];
};

export type Semester = {
  __typename?: 'Semester';
  absentEmployees: Array<AbsentEmployee>;
  absentStudents: Array<AbsentStudent>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type SemesterInput = {
  archiveId: Scalars['String'];
  name: Scalars['String'];
};

export type Student = {
  __typename?: 'Student';
  absentStudents: Array<AbsentStudent>;
  division: Division;
  divisionId: Scalars['String'];
  id: Scalars['String'];
  level: Level;
  levelId: Scalars['String'];
  name: Scalars['String'];
};

export type StudentInput = {
  divisionId: Scalars['String'];
  levelId: Scalars['String'];
  name: Scalars['String'];
};

export type CreateProjectMutationVariables = Exact<{
  name_ar: Scalars['String'];
  current_archive_name: Scalars['String'];
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, name_ar: string, createdAt: any } };

export type FindProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindProjectsQuery = { __typename?: 'Query', findProjects: Array<{ __typename?: 'Project', id: string, name_ar: string, updatedAt: any, createdAt: any, current_archive_name: string }> };

export type FindAllArchivesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllArchivesQuery = { __typename?: 'Query', findAllArchives: Array<{ __typename?: 'Archive', id: string, name: string, project: { __typename?: 'Project', name_ar: string, id: string } }> };

export type FindArchiveQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type FindArchiveQuery = { __typename?: 'Query', findArchive: { __typename?: 'Archive', name: string, id: string, levels: Array<{ __typename?: 'Level', name: string, divisions?: Array<{ __typename?: 'Division', name: string, id: string, students: Array<{ __typename?: 'Student', name: string, id: string }>, employees?: Array<{ __typename?: 'Student', name: string, id: string }> | null }> | null }> } };


export const CreateProjectDocument = `
    mutation createProject($name_ar: String!, $current_archive_name: String!) {
  createProject(
    input: {name_ar: $name_ar, current_archive_name: $current_archive_name}
  ) {
    id
    name_ar
    createdAt
  }
}
    `;
export const useCreateProjectMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateProjectMutation, TError, CreateProjectMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateProjectMutation, TError, CreateProjectMutationVariables, TContext>(
      ['createProject'],
      (variables?: CreateProjectMutationVariables) => fetcher<CreateProjectMutation, CreateProjectMutationVariables>(client, CreateProjectDocument, variables, headers)(),
      options
    );
export const FindProjectsDocument = `
    query findProjects {
  findProjects {
    id
    name_ar
    updatedAt
    createdAt
    current_archive_name
  }
}
    `;
export const useFindProjectsQuery = <
      TData = FindProjectsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: FindProjectsQueryVariables,
      options?: UseQueryOptions<FindProjectsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindProjectsQuery, TError, TData>(
      variables === undefined ? ['findProjects'] : ['findProjects', variables],
      fetcher<FindProjectsQuery, FindProjectsQueryVariables>(client, FindProjectsDocument, variables, headers),
      options
    );
export const FindAllArchivesDocument = `
    query findAllArchives {
  findAllArchives {
    id
    name
    project {
      name_ar
      id
    }
  }
}
    `;
export const useFindAllArchivesQuery = <
      TData = FindAllArchivesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: FindAllArchivesQueryVariables,
      options?: UseQueryOptions<FindAllArchivesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindAllArchivesQuery, TError, TData>(
      variables === undefined ? ['findAllArchives'] : ['findAllArchives', variables],
      fetcher<FindAllArchivesQuery, FindAllArchivesQueryVariables>(client, FindAllArchivesDocument, variables, headers),
      options
    );
export const FindArchiveDocument = `
    query findArchive($name: String!) {
  findArchive(name: $name) {
    name
    id
    levels {
      name
      divisions {
        name
        id
        students {
          name
          id
        }
        employees {
          name
          id
        }
      }
    }
  }
}
    `;
export const useFindArchiveQuery = <
      TData = FindArchiveQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindArchiveQueryVariables,
      options?: UseQueryOptions<FindArchiveQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindArchiveQuery, TError, TData>(
      ['findArchive', variables],
      fetcher<FindArchiveQuery, FindArchiveQueryVariables>(client, FindArchiveDocument, variables, headers),
      options
    );