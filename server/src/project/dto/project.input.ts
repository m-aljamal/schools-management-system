import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProjectInput {
  @Field()
  name_ar: string;
}
