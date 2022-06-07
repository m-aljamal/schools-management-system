import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DivisionInput {
  @Field()
  name: string;

  @Field()
  levelId: string;

  @Field(() => [String])
  archives: string[];
}
