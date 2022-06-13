import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SemesterInput {
  @Field()
  name: string;

  @Field()
  archiveId: string;
}
