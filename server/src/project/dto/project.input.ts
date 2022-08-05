import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProjectInput {
  @Field()
  name_ar: string;

  @Field()
  current_archive_name: string;

  @Field({ nullable: true })
  current_archive_id: string;

  @Field()
  type: string;
}
