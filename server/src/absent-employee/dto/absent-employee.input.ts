import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AbsentEmployeeInput {
  @Field()
  date: Date;

  @Field()
  employeeId: string;

  @Field()
  semesterId: string;

  @Field()
  archiveId: string;

  @Field(() => Boolean, { defaultValue: false })
  approved: boolean;

  @Field({ nullable: true })
  note: string;
}
