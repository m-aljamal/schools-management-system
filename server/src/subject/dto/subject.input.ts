import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SubjectInput {
  @Field()
  name: string;

  @Field()
  levelId: string;
}
