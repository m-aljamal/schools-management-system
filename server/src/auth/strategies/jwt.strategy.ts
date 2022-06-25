import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EmployeeService } from 'src/employee/employee.service';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(validationPayload: {
    username: string;
    role: string;
    sub: string;
  }) {
    console.log('validationPayload', validationPayload);

    return await this.authService.jwtValidate(
      validationPayload.username,
      validationPayload.role,
    );
  }
}
