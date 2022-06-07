import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SemesterInput {
  @Field()
  name: string;

  @Field(() => [String])
  archives: string[];
}
