import { StudentService } from './../student/student.service';
import { Employee } from 'src/employee/entity/employee';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from './../employee/employee.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Student } from 'src/student/entity/student';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly studentService: StudentService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(username: string, password: string): Promise<Employee | null> {
    console.log('validate');

    const user = await this.employeeService.findByUsername(username);

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
    console.log('login');

    const payload = { username: user.username, sub: user.id };

    const token = this.jwtService.sign(payload);
    return {
      accessToken: token,
      user: user,
    };
  }

  async studentValidate(
    username: string,
    password: string,
  ): Promise<Student | null> {
    const student = await this.studentService.findByUserName(username);

    if (!student) {
      return null;
    }
    const isPasswordMatch = bcrypt.compareSync(password, student.password);

    if (!isPasswordMatch) {
      return null;
    }

    return student;
  }

  async studentLogin(student: Student) {
    const payload = { username: student.username, sub: student.id };

    const token = this.jwtService.sign(payload);
    return {
      accessToken: token,
      student,
    };
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
