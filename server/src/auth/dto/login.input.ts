import { Field, InputType } from '@nestjs/graphql';
import { LoginRole } from 'utils/enum';

@InputType()
export class LoginUserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => LoginRole)
  loginRole: LoginRole;
}
