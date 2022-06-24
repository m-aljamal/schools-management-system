import { Student } from 'src/student/entity/student';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'student') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<Student> {
    const student = await this.authService.studentValidate(username, password);

    if (!student) {
      throw new UnauthorizedException();
    }
    return student;
  }
}
