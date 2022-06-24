import { Student } from 'src/student/entity/student';
import { Employee } from 'src/employee/entity/employee';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StudentLoginResponse {
  @Field()
  accessToken: string;

  @Field(() => Student)
  student: Student;
}
