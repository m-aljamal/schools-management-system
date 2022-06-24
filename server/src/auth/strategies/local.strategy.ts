import { Employee } from 'src/employee/entity/employee';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'employee') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      // passReqToCallback: true,
    });
  }

  async validate(username: string, password: string): Promise<Employee> {
    console.log('local strategy validate');

    const user = await this.authService.validate(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
