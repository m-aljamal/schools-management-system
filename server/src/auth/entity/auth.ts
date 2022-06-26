import { registerEnumType } from '@nestjs/graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';
import { LoginRole } from 'utils/enum';

@ObjectType()
@Entity()
export class Auth {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  accessToken: string;

  @Field(() => LoginRole)
  LoginRole: LoginRole;
}
