import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AbsentEmployeeInput {
  @Field()
  date: Date;

  @Field()
  employeeId: string;

  @Field()
  semesterId: string;
}
