import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindDivisionArgs {
  @Field()
  levelId: string;

  @Field({ defaultValue: false })
  students: boolean;
}
