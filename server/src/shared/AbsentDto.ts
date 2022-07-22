import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AbsentInput {
  @Field()
  date: Date;

  @Field()
  semesterId: string;

  @Field()
  archiveId: string;

  @Field(() => Boolean, { defaultValue: false })
  approved: boolean;

  @Field({ nullable: true })
  note: string;
}
