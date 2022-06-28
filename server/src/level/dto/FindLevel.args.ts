import { ReturnData } from './../../../utils/enum';
import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class FindLevelArgs {
  @Field()
  archiveName: string;

  @Field()
  projectId: string;

  @Field(() => ReturnData)
  returnData: ReturnData;
}
