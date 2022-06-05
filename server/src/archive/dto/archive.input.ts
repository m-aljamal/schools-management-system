import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ArchiveInput {
  @Field()
  name: string;
}
