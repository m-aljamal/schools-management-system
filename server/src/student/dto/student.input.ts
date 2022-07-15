import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StudentInput {
  @Field()
  name: string;

  @Field(() => [String])
  levels: string[];

  @Field(() => [String])
  divisions: string[];

  @Field(() => [String])
  archives: string[];

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  projectId: string;
}
