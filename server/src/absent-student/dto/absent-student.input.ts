import { Field, InputType } from '@nestjs/graphql';
import { AbsentInput } from 'src/shared/AbsentDto';

@InputType()
export class AbsentStudentInput extends AbsentInput {
  @Field()
  studentId: string;
}
