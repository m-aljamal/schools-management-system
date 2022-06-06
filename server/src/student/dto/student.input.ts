import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StudentInput {
  @Field()
  name: string;

  @Field()
  levelId: string;

  @Field()
  divisionId: string;

  @Field(() => [String])
  archives: string[];
}
