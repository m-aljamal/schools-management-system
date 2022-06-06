import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TeacherInput {
  @Field()
  name: string;
}
