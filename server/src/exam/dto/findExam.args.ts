import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindExamArgs {
  @Field()
  semesterId: string;
}
