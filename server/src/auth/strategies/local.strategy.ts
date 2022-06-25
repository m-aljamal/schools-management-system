import { Student } from 'src/student/entity/student';
import { Employee } from 'src/employee/entity/employee';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',

      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    username: string,
    password: string,
  ): Promise<Employee | Student> {
    const user = await this.authService.validate(
      username,
      password,
      req.body['role'],
    );

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
