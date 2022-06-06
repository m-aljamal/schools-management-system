import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EmployeeInput {
  @Field()
  name: string;

  @Field(() => [String])
  archives: string[];
}
