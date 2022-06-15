import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProjectInput {
  @Field()
  name_ar: string;

  @Field({ nullable: true })
  current_archive_name: string;
}
