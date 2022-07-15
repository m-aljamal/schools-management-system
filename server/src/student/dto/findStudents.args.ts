import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindStudentsArgs {
  @Field({ nullable: true })
  levelId: string;

  @Field()
  archiveId: string;
}
