import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindArchiveArgs {
  @Field()
  name: string;
}
