import { ArgsType, Field } from '@nestjs/graphql';
import { Role } from 'utils/enum';

@ArgsType()
export class FindEmployeeArgs {
  @Field()
  archiveName: string;

  @Field(() => Role, { nullable: true })
  excludeJobTitle: Role;
}
