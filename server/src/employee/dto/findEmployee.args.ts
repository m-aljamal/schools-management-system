import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindEmployeeArgs {
  @Field()
  archiveId: string;

  @Field({ nullable: true })
  levelId: string;
}
