import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindEmployeeArgs {
  @Field()
  archiveName: string;

  @Field({ nullable: true })
  excludeJobTitle: string;
}
