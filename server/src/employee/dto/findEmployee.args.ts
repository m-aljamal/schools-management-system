import { ArgsType, Field } from '@nestjs/graphql';
import { Role } from 'utils/enum';

@ArgsType()
export class FindEmployeeArgs {
  @Field()
  archiveId: string;

  @Field({ nullable: true })
  levelId: string;
}
