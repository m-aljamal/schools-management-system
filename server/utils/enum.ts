import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'مشرف عام',
  EDUCATION_SUPERVISOR = 'مشرف تربوي',
  PRINCIPAL = 'مدير',
  TEACHER = 'مدرس',
  DATA_ENTRY = 'مدخل بيانات',
  SECRETARY = 'امين سر',
  COUNSELOR = 'مرشد',
  MEDIA_Fotographer = 'اعلامي',
  CLEANER = 'مستخدم',
  GUARD = 'حارس',
  STUDENT = 'طالب',
}

registerEnumType(Role, {
  name: 'Role',
});

export enum LoginRole {
  EMPLOYEE = 'EMPLOYEE',
  STUDENT = 'طالب',
}

registerEnumType(LoginRole, {
  name: 'LoginRole',
});

export enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}
registerEnumType(Sort, {
  name: 'Sort',
});

export enum ExamType {
  FINAL = 'امتحان',
  FIRST_QUIZ = 'مذاكرة اولى',
  SECOND_QUIZ = 'مذاكرة ثانية',
  ORAL_EXAM = 'امتحان شفوي',
  HOME_WORK = 'وظائف',
}
registerEnumType(ExamType, {
  name: 'ExamType',
});
