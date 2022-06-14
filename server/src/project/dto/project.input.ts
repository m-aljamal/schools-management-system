import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProjectInput {
  @Field()
  name_ar: string;

  @Field()
  current_archive_name: string;
}
