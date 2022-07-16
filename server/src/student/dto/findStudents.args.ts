import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindStudentsArgs {
  @Field()
  archiveId: string;
}

@ArgsType()
export class FindStudentArgs extends FindStudentsArgs {
  @Field()
  id: string;
}
