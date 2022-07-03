import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindSemesterArgs {
  @Field()
  archiveId: string;
}
