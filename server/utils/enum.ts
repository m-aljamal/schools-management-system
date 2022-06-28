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

export enum ReturnData {
  FULL = 'FULL',
  EMPLOYEE = 'EMPLOYEE',
  STUDENT = 'STUDENT',
  LEVELS = 'LEVELS',
}
registerEnumType(ReturnData, {
  name: 'ReturnData',
});
