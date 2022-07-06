import { ArgsType, Field } from '@nestjs/graphql';
import { Role } from 'utils/enum';

@ArgsType()
export class FindEmployeeArgs {
  @Field()
  archiveId: string;

  @Field(() => Role, { nullable: true })
  excludeJobTitle: Role;
}
