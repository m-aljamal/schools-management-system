import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindDivisionArgs {
  @Field()
  levelId: string;

  
}
