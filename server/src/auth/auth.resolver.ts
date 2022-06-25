import { GqlLocalAuthGuard } from './guards/gql-local-auth.guard';
import { LoginResponse } from './dto/login.responces';
import { AuthService } from './auth.service';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginUserInput } from './dto/login.input';
import { UseGuards } from '@nestjs/common';
import { StudentLoginResponse } from './dto/student.responce';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlLocalAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ): Promise<LoginResponse> {
    return this.authService.login(context.user);
  }
}
