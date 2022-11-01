import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ExamResultInput {
  @Field()
  examId: string;

  @Field()
  studentId: string;

  @Field(() => Boolean, { nullable: true })
  passTheExam: boolean;
}
