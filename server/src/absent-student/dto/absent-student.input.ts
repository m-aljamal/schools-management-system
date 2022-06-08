import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AbsentStudentInput {
  @Field()
  date: Date;

  @Field()
  studentId: string;

  @Field()
  semesterId: string;
}
