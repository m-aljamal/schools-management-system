import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindEmployeesArgs {
  @Field()
  archiveId: string;

  @Field({ nullable: true })
  levelId: string;
}


@ArgsType()
export class FindEmployeeArgs extends FindEmployeesArgs {
  @Field()
  id: string;
}