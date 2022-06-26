import { Role } from 'utils/enum';
import { StudentService } from './../student/student.service';
import { Employee } from 'src/employee/entity/employee';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from './../employee/employee.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Student } from 'src/student/entity/student';
import { LoginRole } from 'utils/enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly studentService: StudentService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(
    username: string,
    password: string,
    role: LoginRole,
  ): Promise<Employee | null | Student> {
    let user: Employee | Student | null;

    if (LoginRole.STUDENT === role) {
      user = await this.studentService.findByUserName(username);
    } else {
      user = await this.employeeService.findByUsername(username);
    }

    if (!user) {
      return null;
    }
    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      return null;
    }

    return user;
  }

  async login(user: Employee) {
    const payload = { username: user.username, sub: user.id, role: user.role };

    const token = this.jwtService.sign(payload);
    return {
      accessToken: token,
      user: user,
    };
  }

  async jwtValidate(username: string, role: LoginRole) {
    if (LoginRole.STUDENT === role) {
      return await this.studentService.findByUserName(username);
    }
    return await this.employeeService.findByUsername(username);
  }
  // async verify(token: string) {
  //   console.log('verify');

  //   const decoded = await this.jwtService.verify(token, {
  //     secret: process.env.JWT_SECRET,
  //   });
  //   const user = await this.employeeService.findByUsername(decoded.username);
  //   if (!user) {
  //     throw new BadRequestException('Invalid token');
  //   }
  //   return user;
  // }
}
