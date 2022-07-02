import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ExamInput {
  @Field(() => Number)
  mark: number;
}
