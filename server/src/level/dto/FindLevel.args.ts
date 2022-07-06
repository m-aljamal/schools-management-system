import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class FindLevelArgs {
  @Field()
  archiveId: string;

  @Field()
  projectId: string;
}
