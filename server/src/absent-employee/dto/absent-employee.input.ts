import { Field, InputType } from '@nestjs/graphql';
import { AbsentInput } from 'src/shared/AbsentDto';

@InputType()
export class AbsentEmployeeInput extends AbsentInput {
  @Field()
  employeeId: string;
}
