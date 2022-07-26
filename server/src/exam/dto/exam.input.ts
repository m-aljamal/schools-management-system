import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ExamInput {
  @Field()
  semesterId: string;

  @Field()
  levelId: string;

  @Field()
  archiveId: string;
}
