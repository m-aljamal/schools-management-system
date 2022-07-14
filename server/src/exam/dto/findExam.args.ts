import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindExamArgs {
  @Field({ nullable: true })
  semesterId: string;

  @Field({ nullable: true })
  subjectId: string;

  @Field({ nullable: true })
  levelId: string;

  @Field()
  archiveId: string;
}
