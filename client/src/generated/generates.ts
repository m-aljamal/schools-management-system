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
  employees: Array<Employee>;
  id: Scalars['String'];
  levels: Array<Level>;
  name: Scalars['String'];
  project: Project;
  projectId: Scalars['String'];
  semesters: Array<Semester>;
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
  archives?: Maybe<Array<Archive>>;
  divisions: Array<Division>;
  id: Scalars['String'];
  levels: Array<Level>;
  name: Scalars['String'];
  password: Scalars['String'];
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['String']>;
  role: Role;
  username: Scalars['String'];
};

export type EmployeeInput = {
  archives?: InputMaybe<Array<Scalars['String']>>;
  divisions?: InputMaybe<Array<Scalars['String']>>;
  levels?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  password: Scalars['String'];
  projectId?: InputMaybe<Scalars['String']>;
  role: Role;
  username: Scalars['String'];
};

export type Exam = {
  __typename?: 'Exam';
  grades?: Maybe<Array<Grade>>;
  id: Scalars['String'];
  level: Level;
  levelId: Scalars['String'];
  semester: Semester;
  semesterId: Scalars['String'];
};

export type ExamInput = {
  levelId: Scalars['String'];
  semesterId: Scalars['String'];
};

export type Grade = {
  __typename?: 'Grade';
  exam: Exam;
  examId: Scalars['String'];
  final_grade?: Maybe<Scalars['Float']>;
  first_quiz_grade?: Maybe<Scalars['Float']>;
  homework_grade?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  oral_grade?: Maybe<Scalars['Float']>;
  second_quiz_grade?: Maybe<Scalars['Float']>;
  student: Student;
  studentId: Scalars['String'];
  subject: Subject;
  subjectId: Scalars['String'];
};

export type GradeInput = {
  examId: Scalars['String'];
  final_grade?: InputMaybe<Scalars['Float']>;
  first_quiz_grade?: InputMaybe<Scalars['Float']>;
  homework_grade?: InputMaybe<Scalars['Float']>;
  oral_grade?: InputMaybe<Scalars['Float']>;
  second_quiz_grade?: InputMaybe<Scalars['Float']>;
  studentId: Scalars['String'];
  subjectId: Scalars['String'];
};

export type Level = {
  __typename?: 'Level';
  archive: Archive;
  archiveId: Scalars['String'];
  divisions?: Maybe<Array<Division>>;
  employees?: Maybe<Array<Student>>;
  exams: Array<Exam>;
  id: Scalars['String'];
  name: Scalars['String'];
  students?: Maybe<Array<Student>>;
  subjects: Array<Subject>;
};

export type LevelInput = {
  archiveId: Scalars['String'];
  name: Scalars['String'];
};

export type LevelUpdateInput = {
  archiveId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: Employee;
};

export enum LoginRole {
  Employee = 'EMPLOYEE',
  Student = 'STUDENT'
}

export type LoginUserInput = {
  loginRole: LoginRole;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAbsentEmployee: AbsentEmployee;
  createAbsentStudent: AbsentStudent;
  createArchive: Archive;
  createDivision: Division;
  createEmployee: Employee;
  createExam: Exam;
  createGrade: Grade;
  createLevel: Level;
  createProject: Project;
  createSemester: Semester;
  createStudent: Student;
  createSubject: Subject;
  login: LoginResponse;
  updateLevel: Level;
  updateProject: Project;
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


export type MutationCreateExamArgs = {
  input: ExamInput;
};


export type MutationCreateGradeArgs = {
  input: GradeInput;
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


export type MutationCreateSubjectArgs = {
  input: SubjectInput;
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationUpdateLevelArgs = {
  id: Scalars['String'];
  input: LevelUpdateInput;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['String'];
  updateProjectInput: UpdateProject;
};

export type Project = {
  __typename?: 'Project';
  archives?: Maybe<Array<Archive>>;
  createdAt: Scalars['DateTime'];
  current_archive_id?: Maybe<Scalars['String']>;
  current_archive_name?: Maybe<Scalars['String']>;
  employees?: Maybe<Array<Employee>>;
  id: Scalars['String'];
  name_ar: Scalars['String'];
  students?: Maybe<Array<Employee>>;
  updatedAt: Scalars['DateTime'];
};

export type ProjectInput = {
  current_archive_id?: InputMaybe<Scalars['String']>;
  current_archive_name: Scalars['String'];
  name_ar: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  absentStudents: Array<AbsentStudent>;
  currentUser?: Maybe<Employee>;
  findAbsentEmployees: Array<AbsentEmployee>;
  findArchive: Archive;
  findArchives: Array<Archive>;
  findDivisions: Array<Division>;
  findEmployee: Employee;
  findEmployees: Array<Employee>;
  findExams: Array<Exam>;
  findGrades: Array<Grade>;
  findProjects: Array<Project>;
  findSemesters: Array<Semester>;
  findStudents: Array<Student>;
  findSubjects: Array<Subject>;
  find_levels_divisions: Array<Level>;
  find_levels_divisions_employees: Array<Level>;
  find_levels_divisions_employees_students: Array<Level>;
  find_levels_divisions_students: Array<Level>;
};


export type QueryFindArchiveArgs = {
  archiveId: Scalars['String'];
  projectId: Scalars['String'];
  sortBy?: InputMaybe<Sort>;
};


export type QueryFindArchivesArgs = {
  archiveId?: InputMaybe<Scalars['String']>;
  projectId: Scalars['String'];
  sortBy?: InputMaybe<Sort>;
};


export type QueryFindEmployeeArgs = {
  id: Scalars['String'];
};


export type QueryFindEmployeesArgs = {
  archiveId: Scalars['String'];
  excludeJobTitle?: InputMaybe<Role>;
};


export type QueryFindExamsArgs = {
  semesterId: Scalars['String'];
};


export type QueryFindSemestersArgs = {
  archiveId: Scalars['String'];
};


export type QueryFind_Levels_DivisionsArgs = {
  archiveId: Scalars['String'];
  projectId: Scalars['String'];
};


export type QueryFind_Levels_Divisions_EmployeesArgs = {
  archiveId: Scalars['String'];
  projectId: Scalars['String'];
};


export type QueryFind_Levels_Divisions_Employees_StudentsArgs = {
  archiveId: Scalars['String'];
  projectId: Scalars['String'];
};


export type QueryFind_Levels_Divisions_StudentsArgs = {
  archiveId: Scalars['String'];
  projectId: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  Cleaner = 'CLEANER',
  Counselor = 'COUNSELOR',
  DataEntry = 'DATA_ENTRY',
  EducationSupervisor = 'EDUCATION_SUPERVISOR',
  Guard = 'GUARD',
  MediaFotographer = 'MEDIA_Fotographer',
  Principal = 'PRINCIPAL',
  Secretary = 'SECRETARY',
  Student = 'STUDENT',
  Teacher = 'TEACHER'
}

export type Semester = {
  __typename?: 'Semester';
  absentEmployees: Array<AbsentEmployee>;
  absentStudents: Array<AbsentStudent>;
  archive: Archive;
  archiveId: Scalars['String'];
  exams: Array<Exam>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type SemesterInput = {
  archiveId: Scalars['String'];
  name: Scalars['String'];
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Student = {
  __typename?: 'Student';
  absentStudents: Array<AbsentStudent>;
  division: Division;
  divisionId: Scalars['String'];
  grades: Array<Grade>;
  id: Scalars['String'];
  level: Level;
  levelId: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  project: Project;
  projectId: Scalars['String'];
  role: Scalars['String'];
  username: Scalars['String'];
};

export type StudentInput = {
  divisionId: Scalars['String'];
  levelId: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  projectId: Scalars['String'];
  username: Scalars['String'];
};

export type Subject = {
  __typename?: 'Subject';
  grades: Array<Grade>;
  id: Scalars['String'];
  level: Level;
  levelId: Scalars['String'];
  name: Scalars['String'];
};

export type SubjectInput = {
  levelId: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateProject = {
  current_archive_id?: InputMaybe<Scalars['String']>;
  current_archive_name?: InputMaybe<Scalars['String']>;
  name_ar?: InputMaybe<Scalars['String']>;
};

export type CreateProjectMutationVariables = Exact<{
  name_ar: Scalars['String'];
  current_archive_name: Scalars['String'];
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, name_ar: string, createdAt: any } };

export type FindProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindProjectsQuery = { __typename?: 'Query', findProjects: Array<{ __typename?: 'Project', id: string, name_ar: string, updatedAt: any, createdAt: any, current_archive_name?: string | null, current_archive_id?: string | null }> };

export type FindArchivesQueryVariables = Exact<{
  projectId: Scalars['String'];
  archiveId?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Sort>;
}>;


export type FindArchivesQuery = { __typename?: 'Query', findArchives: Array<{ __typename?: 'Archive', id: string, name: string, project: { __typename?: 'Project', name_ar: string, id: string } }> };

export type FindArchiveQueryVariables = Exact<{
  archiveId: Scalars['String'];
  projectId: Scalars['String'];
  sortBy?: InputMaybe<Sort>;
}>;


export type FindArchiveQuery = { __typename?: 'Query', findArchive: { __typename?: 'Archive', name: string, id: string, levels: Array<{ __typename?: 'Level', name: string, divisions?: Array<{ __typename?: 'Division', name: string, id: string, students: Array<{ __typename?: 'Student', name: string, id: string }>, employees?: Array<{ __typename?: 'Student', name: string, id: string }> | null }> | null }> } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  loginRole: LoginRole;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'Employee', name: string, id: string, username: string } } };

export type CreateDivisionMutationVariables = Exact<{
  levelId: Scalars['String'];
  name: Scalars['String'];
}>;


export type CreateDivisionMutation = { __typename?: 'Mutation', createDivision: { __typename?: 'Division', id: string, name: string } };

export type FindEmployeesQueryVariables = Exact<{
  archiveId: Scalars['String'];
  excludeJobTitle?: InputMaybe<Role>;
}>;


export type FindEmployeesQuery = { __typename?: 'Query', findEmployees: Array<{ __typename?: 'Employee', name: string, id: string }> };

export type FindEmployeeQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FindEmployeeQuery = { __typename?: 'Query', findEmployee: { __typename?: 'Employee', id: string, name: string, levels: Array<{ __typename?: 'Level', name: string, id: string, divisions?: Array<{ __typename?: 'Division', name: string, id: string }> | null }> } };

export type FindExamsQueryVariables = Exact<{
  semesterId: Scalars['String'];
}>;


export type FindExamsQuery = { __typename?: 'Query', findExams: Array<{ __typename?: 'Exam', id: string, semesterId: string, grades?: Array<{ __typename?: 'Grade', final_grade?: number | null, first_quiz_grade?: number | null, homework_grade?: number | null, id: string, oral_grade?: number | null, second_quiz_grade?: number | null, subject: { __typename?: 'Subject', id: string, name: string }, student: { __typename?: 'Student', name: string } }> | null, level: { __typename?: 'Level', id: string, name: string } }> };

export type CreateLevelMutationVariables = Exact<{
  name: Scalars['String'];
  archiveId: Scalars['String'];
}>;


export type CreateLevelMutation = { __typename?: 'Mutation', createLevel: { __typename?: 'Level', id: string, name: string } };

export type Find_Levels_DivisionsQueryVariables = Exact<{
  archiveId: Scalars['String'];
  projectId: Scalars['String'];
}>;


export type Find_Levels_DivisionsQuery = { __typename?: 'Query', find_levels_divisions: Array<{ __typename?: 'Level', id: string, name: string, archive: { __typename?: 'Archive', name: string, id: string, projectId: string }, divisions?: Array<{ __typename?: 'Division', name: string, id: string }> | null }> };

export type Find_Levels_Divisions_Employees_StudentsQueryVariables = Exact<{
  archiveId: Scalars['String'];
  projectId: Scalars['String'];
}>;


export type Find_Levels_Divisions_Employees_StudentsQuery = { __typename?: 'Query', find_levels_divisions_employees_students: Array<{ __typename?: 'Level', id: string, name: string, archive: { __typename?: 'Archive', name: string, id: string, projectId: string }, divisions?: Array<{ __typename?: 'Division', name: string, id: string, students: Array<{ __typename?: 'Student', id: string, name: string }>, employees?: Array<{ __typename?: 'Student', id: string }> | null }> | null }> };

export type Find_Levels_Divisions_StudentsQueryVariables = Exact<{
  archiveId: Scalars['String'];
  projectId: Scalars['String'];
}>;


export type Find_Levels_Divisions_StudentsQuery = { __typename?: 'Query', find_levels_divisions_students: Array<{ __typename?: 'Level', id: string, name: string, archive: { __typename?: 'Archive', name: string, id: string, projectId: string }, divisions?: Array<{ __typename?: 'Division', name: string, id: string, students: Array<{ __typename?: 'Student', id: string, name: string }> }> | null }> };

export type Find_Levels_Divisions_EmployeesQueryVariables = Exact<{
  archiveId: Scalars['String'];
  projectId: Scalars['String'];
}>;


export type Find_Levels_Divisions_EmployeesQuery = { __typename?: 'Query', find_levels_divisions_employees: Array<{ __typename?: 'Level', id: string, name: string, archive: { __typename?: 'Archive', name: string, id: string, projectId: string }, divisions?: Array<{ __typename?: 'Division', name: string, id: string, employees?: Array<{ __typename?: 'Student', name: string, id: string }> | null }> | null }> };

export type FindSemestersQueryVariables = Exact<{
  archiveId: Scalars['String'];
}>;


export type FindSemestersQuery = { __typename?: 'Query', findSemesters: Array<{ __typename?: 'Semester', id: string, name: string }> };


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
    current_archive_id
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
export const FindArchivesDocument = `
    query findArchives($projectId: String!, $archiveId: String, $sortBy: Sort) {
  findArchives(projectId: $projectId, archiveId: $archiveId, sortBy: $sortBy) {
    id
    name
    project {
      name_ar
      id
    }
  }
}
    `;
export const useFindArchivesQuery = <
      TData = FindArchivesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindArchivesQueryVariables,
      options?: UseQueryOptions<FindArchivesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindArchivesQuery, TError, TData>(
      ['findArchives', variables],
      fetcher<FindArchivesQuery, FindArchivesQueryVariables>(client, FindArchivesDocument, variables, headers),
      options
    );
export const FindArchiveDocument = `
    query findArchive($archiveId: String!, $projectId: String!, $sortBy: Sort) {
  findArchive(archiveId: $archiveId, projectId: $projectId, sortBy: $sortBy) {
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
export const LoginDocument = `
    mutation login($username: String!, $password: String!, $loginRole: LoginRole!) {
  login(
    loginUserInput: {password: $password, username: $username, loginRole: $loginRole}
  ) {
    accessToken
    user {
      name
      id
      username
    }
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['login'],
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
      options
    );
export const CreateDivisionDocument = `
    mutation createDivision($levelId: String!, $name: String!) {
  createDivision(input: {levelId: $levelId, name: $name}) {
    id
    name
  }
}
    `;
export const useCreateDivisionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateDivisionMutation, TError, CreateDivisionMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateDivisionMutation, TError, CreateDivisionMutationVariables, TContext>(
      ['createDivision'],
      (variables?: CreateDivisionMutationVariables) => fetcher<CreateDivisionMutation, CreateDivisionMutationVariables>(client, CreateDivisionDocument, variables, headers)(),
      options
    );
export const FindEmployeesDocument = `
    query findEmployees($archiveId: String!, $excludeJobTitle: Role) {
  findEmployees(archiveId: $archiveId, excludeJobTitle: $excludeJobTitle) {
    name
    id
  }
}
    `;
export const useFindEmployeesQuery = <
      TData = FindEmployeesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindEmployeesQueryVariables,
      options?: UseQueryOptions<FindEmployeesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindEmployeesQuery, TError, TData>(
      ['findEmployees', variables],
      fetcher<FindEmployeesQuery, FindEmployeesQueryVariables>(client, FindEmployeesDocument, variables, headers),
      options
    );
export const FindEmployeeDocument = `
    query findEmployee($id: String!) {
  findEmployee(id: $id) {
    id
    name
    levels {
      name
      id
      divisions {
        name
        id
      }
    }
  }
}
    `;
export const useFindEmployeeQuery = <
      TData = FindEmployeeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindEmployeeQueryVariables,
      options?: UseQueryOptions<FindEmployeeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindEmployeeQuery, TError, TData>(
      ['findEmployee', variables],
      fetcher<FindEmployeeQuery, FindEmployeeQueryVariables>(client, FindEmployeeDocument, variables, headers),
      options
    );
export const FindExamsDocument = `
    query findExams($semesterId: String!) {
  findExams(semesterId: $semesterId) {
    id
    semesterId
    grades {
      final_grade
      first_quiz_grade
      homework_grade
      id
      oral_grade
      second_quiz_grade
      id
      subject {
        id
        name
      }
      student {
        name
      }
    }
    level {
      id
      name
    }
  }
}
    `;
export const useFindExamsQuery = <
      TData = FindExamsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindExamsQueryVariables,
      options?: UseQueryOptions<FindExamsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindExamsQuery, TError, TData>(
      ['findExams', variables],
      fetcher<FindExamsQuery, FindExamsQueryVariables>(client, FindExamsDocument, variables, headers),
      options
    );
export const CreateLevelDocument = `
    mutation createLevel($name: String!, $archiveId: String!) {
  createLevel(input: {name: $name, archiveId: $archiveId}) {
    id
    name
  }
}
    `;
export const useCreateLevelMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateLevelMutation, TError, CreateLevelMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateLevelMutation, TError, CreateLevelMutationVariables, TContext>(
      ['createLevel'],
      (variables?: CreateLevelMutationVariables) => fetcher<CreateLevelMutation, CreateLevelMutationVariables>(client, CreateLevelDocument, variables, headers)(),
      options
    );
export const Find_Levels_DivisionsDocument = `
    query find_levels_divisions($archiveId: String!, $projectId: String!) {
  find_levels_divisions(archiveId: $archiveId, projectId: $projectId) {
    id
    name
    archive {
      name
      id
      projectId
    }
    divisions {
      name
      id
    }
  }
}
    `;
export const useFind_Levels_DivisionsQuery = <
      TData = Find_Levels_DivisionsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: Find_Levels_DivisionsQueryVariables,
      options?: UseQueryOptions<Find_Levels_DivisionsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<Find_Levels_DivisionsQuery, TError, TData>(
      ['find_levels_divisions', variables],
      fetcher<Find_Levels_DivisionsQuery, Find_Levels_DivisionsQueryVariables>(client, Find_Levels_DivisionsDocument, variables, headers),
      options
    );
export const Find_Levels_Divisions_Employees_StudentsDocument = `
    query find_levels_divisions_employees_students($archiveId: String!, $projectId: String!) {
  find_levels_divisions_employees_students(
    archiveId: $archiveId
    projectId: $projectId
  ) {
    id
    name
    archive {
      name
      id
      projectId
    }
    divisions {
      name
      id
      students {
        id
        name
      }
      employees {
        id
      }
    }
  }
}
    `;
export const useFind_Levels_Divisions_Employees_StudentsQuery = <
      TData = Find_Levels_Divisions_Employees_StudentsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: Find_Levels_Divisions_Employees_StudentsQueryVariables,
      options?: UseQueryOptions<Find_Levels_Divisions_Employees_StudentsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<Find_Levels_Divisions_Employees_StudentsQuery, TError, TData>(
      ['find_levels_divisions_employees_students', variables],
      fetcher<Find_Levels_Divisions_Employees_StudentsQuery, Find_Levels_Divisions_Employees_StudentsQueryVariables>(client, Find_Levels_Divisions_Employees_StudentsDocument, variables, headers),
      options
    );
export const Find_Levels_Divisions_StudentsDocument = `
    query find_levels_divisions_students($archiveId: String!, $projectId: String!) {
  find_levels_divisions_students(archiveId: $archiveId, projectId: $projectId) {
    id
    name
    archive {
      name
      id
      projectId
    }
    divisions {
      name
      id
      students {
        id
        name
      }
    }
  }
}
    `;
export const useFind_Levels_Divisions_StudentsQuery = <
      TData = Find_Levels_Divisions_StudentsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: Find_Levels_Divisions_StudentsQueryVariables,
      options?: UseQueryOptions<Find_Levels_Divisions_StudentsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<Find_Levels_Divisions_StudentsQuery, TError, TData>(
      ['find_levels_divisions_students', variables],
      fetcher<Find_Levels_Divisions_StudentsQuery, Find_Levels_Divisions_StudentsQueryVariables>(client, Find_Levels_Divisions_StudentsDocument, variables, headers),
      options
    );
export const Find_Levels_Divisions_EmployeesDocument = `
    query find_levels_divisions_employees($archiveId: String!, $projectId: String!) {
  find_levels_divisions_employees(archiveId: $archiveId, projectId: $projectId) {
    id
    name
    archive {
      name
      id
      projectId
    }
    divisions {
      name
      id
      employees {
        name
        id
      }
    }
  }
}
    `;
export const useFind_Levels_Divisions_EmployeesQuery = <
      TData = Find_Levels_Divisions_EmployeesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: Find_Levels_Divisions_EmployeesQueryVariables,
      options?: UseQueryOptions<Find_Levels_Divisions_EmployeesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<Find_Levels_Divisions_EmployeesQuery, TError, TData>(
      ['find_levels_divisions_employees', variables],
      fetcher<Find_Levels_Divisions_EmployeesQuery, Find_Levels_Divisions_EmployeesQueryVariables>(client, Find_Levels_Divisions_EmployeesDocument, variables, headers),
      options
    );
export const FindSemestersDocument = `
    query findSemesters($archiveId: String!) {
  findSemesters(archiveId: $archiveId) {
    id
    name
  }
}
    `;
export const useFindSemestersQuery = <
      TData = FindSemestersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindSemestersQueryVariables,
      options?: UseQueryOptions<FindSemestersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindSemestersQuery, TError, TData>(
      ['findSemesters', variables],
      fetcher<FindSemestersQuery, FindSemestersQueryVariables>(client, FindSemestersDocument, variables, headers),
      options
    );