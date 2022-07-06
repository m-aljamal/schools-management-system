import { ArgsType, Field } from '@nestjs/graphql';
import { Sort } from 'utils/enum';

@ArgsType()
export class FindArchivesArgs {
  @Field({ nullable: true })
  archiveId: string;

  @Field()
  projectId: string;

  @Field(() => Sort, { nullable: true })
  sortBy: Sort;
}

@ArgsType()
export class FindArchiveArgs extends FindArchivesArgs {
  @Field()
  archiveId: string;
}
