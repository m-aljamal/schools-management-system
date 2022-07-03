import { Field, InputType } from '@nestjs/graphql';
import { Role } from 'utils/enum';

@InputType()
export class EmployeeInput {
  @Field()
  name: string;

  @Field(() => [String])
  archives: string[];

  @Field(() => [String], { nullable: true })
  levels: string[];

  @Field(() => [String], { nullable: true })
  divisions: string[];

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => Role)
  role: Role;

  @Field()
  projectId: string;
}
