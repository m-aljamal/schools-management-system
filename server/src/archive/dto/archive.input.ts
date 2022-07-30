import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ArchiveInput {
  @Field()
  name: string;

  @Field()
  projectId: string;
}


@InputType()
export class OpenNewArchive extends ArchiveInput {
  @Field()
  currentArchiveId: string;
}