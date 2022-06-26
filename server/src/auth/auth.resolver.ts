import { Student } from 'src/student/entity/student';
import { GqlLocalAuthGuard } from './guards/gql-local-auth.guard';
import { LoginResponse } from './dto/login.responces';
import { AuthService } from './auth.service';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginUserInput } from './dto/login.input';
import { UseGuards } from '@nestjs/common';
import { Employee } from 'src/employee/entity/employee';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';

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

  @UseGuards(JwtAuthGuard)
  @Query(() => Employee, { name: 'currentUser', nullable: true })
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@CurrentUser() user: Employee | Student) {
    return user;
  }
}
