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
  findExams: Array<Exam>;
  findGrades: Array<Grade>;
  findLevel: Level;
  findLevels: Array<Level>;
  findManagers: Array<Employee>;
  findProjects: Array<Project>;
  findSemesters: Array<Semester>;
  findStudents: Array<Student>;
  findSubjects: Array<Subject>;
  findTeachers: Array<Employee>;
  findTechers_levels: Array<Level>;
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


export type QueryFindDivisionsArgs = {
  levelId: Scalars['String'];
};


export type QueryFindEmployeeArgs = {
  id: Scalars['String'];
};


export type QueryFindExamsArgs = {
  archiveId: Scalars['String'];
  levelId?: InputMaybe<Scalars['String']>;
  semesterId?: InputMaybe<Scalars['String']>;
  subjectId?: InputMaybe<Scalars['String']>;
};


export type QueryFindLevelArgs = {
  levelId: Scalars['String'];
};


export type QueryFindLevelsArgs = {
  archiveId: Scalars['String'];
};


export type QueryFindManagersArgs = {
  archiveId: Scalars['String'];
  levelId?: InputMaybe<Scalars['String']>;
};


export type QueryFindSemestersArgs = {
  archiveId: Scalars['String'];
};


export type QueryFindStudentsArgs = {
  levelId: Scalars['String'];
};


export type QueryFindSubjectsArgs = {
  levelId: Scalars['String'];
};


export type QueryFindTeachersArgs = {
  archiveId: Scalars['String'];
  levelId?: InputMaybe<Scalars['String']>;
};


export type QueryFindTechers_LevelsArgs = {
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

export type FindDivisionsQueryVariables = Exact<{
  levelId: Scalars['String'];
}>;


export type FindDivisionsQuery = { __typename?: 'Query', findDivisions: Array<{ __typename?: 'Division', name: string, id: string }> };

export type FindDivisionsStudentsQueryVariables = Exact<{
  levelId: Scalars['String'];
}>;


export type FindDivisionsStudentsQuery = { __typename?: 'Query', findDivisions: Array<{ __typename?: 'Division', name: string, id: string, students: Array<{ __typename?: 'Student', name: string, id: string }> }> };

export type FindEmployeeQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FindEmployeeQuery = { __typename?: 'Query', findEmployee: { __typename?: 'Employee', id: string, name: string, levels: Array<{ __typename?: 'Level', name: string, id: string, divisions?: Array<{ __typename?: 'Division', name: string, id: string }> | null }> } };

export type FindTeachers_DivisionsQueryVariables = Exact<{
  archiveId: Scalars['String'];
  levelId: Scalars['String'];
}>;


export type FindTeachers_DivisionsQuery = { __typename?: 'Query', findTeachers: Array<{ __typename?: 'Employee', name: string, id: string, divisions: Array<{ __typename?: 'Division', name: string, id: string, level: { __typename?: 'Level', name: string, id: string } }> }> };

export type FindManagersQueryVariables = Exact<{
  archiveId: Scalars['String'];
}>;


export type FindManagersQuery = { __typename?: 'Query', findManagers: Array<{ __typename?: 'Employee', name: string, id: string, role: Role }> };

export type FindExams_LevelQueryVariables = Exact<{
  levelId: Scalars['String'];
  archiveId: Scalars['String'];
}>;


export type FindExams_LevelQuery = { __typename?: 'Query', findExams: Array<{ __typename?: 'Exam', id: string, level: { __typename?: 'Level', id: string, name: string }, semester: { __typename?: 'Semester', name: string, id: string }, grades?: Array<{ __typename?: 'Grade', final_grade?: number | null, first_quiz_grade?: number | null, homework_grade?: number | null, id: string, oral_grade?: number | null, second_quiz_grade?: number | null, subject: { __typename?: 'Subject', id: string, name: string }, student: { __typename?: 'Student', name: string } }> | null }> };

export type CreateLevelMutationVariables = Exact<{
  name: Scalars['String'];
  archiveId: Scalars['String'];
}>;


export type CreateLevelMutation = { __typename?: 'Mutation', createLevel: { __typename?: 'Level', id: string, name: string } };

export type FindLevelsQueryVariables = Exact<{
  archiveId: Scalars['String'];
}>;


export type FindLevelsQuery = { __typename?: 'Query', findLevels: Array<{ __typename?: 'Level', name: string, id: string }> };

export type FindLevelQueryVariables = Exact<{
  levelId: Scalars['String'];
}>;


export type FindLevelQuery = { __typename?: 'Query', findLevel: { __typename?: 'Level', name: string, id: string } };

export type FindTechers_LevelsQueryVariables = Exact<{
  archiveId: Scalars['String'];
}>;


export type FindTechers_LevelsQuery = { __typename?: 'Query', findTechers_levels: Array<{ __typename?: 'Level', name: string, id: string, divisions?: Array<{ __typename?: 'Division', name: string, id: string, employees?: Array<{ __typename?: 'Student', name: string, id: string, role: string }> | null }> | null }> };

export type FindSemestersQueryVariables = Exact<{
  archiveId: Scalars['String'];
}>;


export type FindSemestersQuery = { __typename?: 'Query', findSemesters: Array<{ __typename?: 'Semester', id: string, name: string }> };

export type FindSubjectsQueryVariables = Exact<{
  levelId: Scalars['String'];
}>;


export type FindSubjectsQuery = { __typename?: 'Query', findSubjects: Array<{ __typename?: 'Subject', id: string, name: string }> };


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
export const FindDivisionsDocument = `
    query findDivisions($levelId: String!) {
  findDivisions(levelId: $levelId) {
    name
    id
  }
}
    `;
export const useFindDivisionsQuery = <
      TData = FindDivisionsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindDivisionsQueryVariables,
      options?: UseQueryOptions<FindDivisionsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindDivisionsQuery, TError, TData>(
      ['findDivisions', variables],
      fetcher<FindDivisionsQuery, FindDivisionsQueryVariables>(client, FindDivisionsDocument, variables, headers),
      options
    );
export const FindDivisionsStudentsDocument = `
    query findDivisionsStudents($levelId: String!) {
  findDivisions(levelId: $levelId) {
    name
    id
    students {
      name
      id
    }
  }
}
    `;
export const useFindDivisionsStudentsQuery = <
      TData = FindDivisionsStudentsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindDivisionsStudentsQueryVariables,
      options?: UseQueryOptions<FindDivisionsStudentsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindDivisionsStudentsQuery, TError, TData>(
      ['findDivisionsStudents', variables],
      fetcher<FindDivisionsStudentsQuery, FindDivisionsStudentsQueryVariables>(client, FindDivisionsStudentsDocument, variables, headers),
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
export const FindTeachers_DivisionsDocument = `
    query findTeachers_divisions($archiveId: String!, $levelId: String!) {
  findTeachers(archiveId: $archiveId, levelId: $levelId) {
    name
    id
    divisions {
      name
      id
      level {
        name
        id
      }
    }
  }
}
    `;
export const useFindTeachers_DivisionsQuery = <
      TData = FindTeachers_DivisionsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindTeachers_DivisionsQueryVariables,
      options?: UseQueryOptions<FindTeachers_DivisionsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindTeachers_DivisionsQuery, TError, TData>(
      ['findTeachers_divisions', variables],
      fetcher<FindTeachers_DivisionsQuery, FindTeachers_DivisionsQueryVariables>(client, FindTeachers_DivisionsDocument, variables, headers),
      options
    );
export const FindManagersDocument = `
    query findManagers($archiveId: String!) {
  findManagers(archiveId: $archiveId) {
    name
    id
    role
  }
}
    `;
export const useFindManagersQuery = <
      TData = FindManagersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindManagersQueryVariables,
      options?: UseQueryOptions<FindManagersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindManagersQuery, TError, TData>(
      ['findManagers', variables],
      fetcher<FindManagersQuery, FindManagersQueryVariables>(client, FindManagersDocument, variables, headers),
      options
    );
export const FindExams_LevelDocument = `
    query findExams_level($levelId: String!, $archiveId: String!) {
  findExams(archiveId: $archiveId, levelId: $levelId) {
    id
    level {
      id
      name
    }
    semester {
      name
      id
    }
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
  }
}
    `;
export const useFindExams_LevelQuery = <
      TData = FindExams_LevelQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindExams_LevelQueryVariables,
      options?: UseQueryOptions<FindExams_LevelQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindExams_LevelQuery, TError, TData>(
      ['findExams_level', variables],
      fetcher<FindExams_LevelQuery, FindExams_LevelQueryVariables>(client, FindExams_LevelDocument, variables, headers),
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
export const FindLevelsDocument = `
    query findLevels($archiveId: String!) {
  findLevels(archiveId: $archiveId) {
    name
    id
  }
}
    `;
export const useFindLevelsQuery = <
      TData = FindLevelsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindLevelsQueryVariables,
      options?: UseQueryOptions<FindLevelsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindLevelsQuery, TError, TData>(
      ['findLevels', variables],
      fetcher<FindLevelsQuery, FindLevelsQueryVariables>(client, FindLevelsDocument, variables, headers),
      options
    );
export const FindLevelDocument = `
    query findLevel($levelId: String!) {
  findLevel(levelId: $levelId) {
    name
    id
  }
}
    `;
export const useFindLevelQuery = <
      TData = FindLevelQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindLevelQueryVariables,
      options?: UseQueryOptions<FindLevelQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindLevelQuery, TError, TData>(
      ['findLevel', variables],
      fetcher<FindLevelQuery, FindLevelQueryVariables>(client, FindLevelDocument, variables, headers),
      options
    );
export const FindTechers_LevelsDocument = `
    query findTechers_levels($archiveId: String!) {
  findTechers_levels(archiveId: $archiveId) {
    name
    id
    divisions {
      name
      id
      employees {
        name
        id
        role
      }
    }
  }
}
    `;
export const useFindTechers_LevelsQuery = <
      TData = FindTechers_LevelsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindTechers_LevelsQueryVariables,
      options?: UseQueryOptions<FindTechers_LevelsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindTechers_LevelsQuery, TError, TData>(
      ['findTechers_levels', variables],
      fetcher<FindTechers_LevelsQuery, FindTechers_LevelsQueryVariables>(client, FindTechers_LevelsDocument, variables, headers),
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
export const FindSubjectsDocument = `
    query findSubjects($levelId: String!) {
  findSubjects(levelId: $levelId) {
    id
    name
  }
}
    `;
export const useFindSubjectsQuery = <
      TData = FindSubjectsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindSubjectsQueryVariables,
      options?: UseQueryOptions<FindSubjectsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindSubjectsQuery, TError, TData>(
      ['findSubjects', variables],
      fetcher<FindSubjectsQuery, FindSubjectsQueryVariables>(client, FindSubjectsDocument, variables, headers),
      options
    );