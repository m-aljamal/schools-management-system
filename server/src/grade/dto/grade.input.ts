import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GradeInput {
  @Field()
  subjectId: string;

  @Field()
  examId: string;

  @Field()
  studentId: string;

  @Field({ nullable: true })
  final_grade: number;

  @Field(() => Number, { nullable: true })
  first_quiz_grade: number;

  @Field(() => Number, { nullable: true })
  second_quiz_grade: number;

  @Field(() => Number, { nullable: true })
  oral_grade: number;

  @Field(() => Number, { nullable: true })
  homework_grade: number;
}
