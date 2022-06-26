import { Field, InputType } from '@nestjs/graphql';
import { Role } from 'utils/enum';

@InputType()
export class EmployeeInput {
  @Field()
  name: string;

  @Field(() => [String])
  archives: string[];

  @Field(() => [String])
  levels: string[];

  @Field(() => [String])
  divisions: string[];

  @Field()
  jobTitle: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => Role)
  role: Role;

  @Field()
  projectId: string;
}
