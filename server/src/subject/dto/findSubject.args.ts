import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindSubject {
  @Field()
  levelId: string;

  @Field()
  semesterId: string;
}
