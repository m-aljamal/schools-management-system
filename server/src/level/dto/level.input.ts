import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LevelInput {
  @Field()
  name: string;

  @Field()
  archiveId: string;
}
