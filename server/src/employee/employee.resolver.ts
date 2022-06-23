import { CurrentUser } from './../auth/current-user.decorator';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmployeeInput } from './dto/employee.input';
import { Employee } from './entity/employee';
import { EmployeeService } from './employee.service';
import { FindEmployeeArgs } from './dto/findEmployee.args';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Employee)
export class TeacherResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [Employee], { name: 'findEmployees' })
  async findAll(@Args() args: FindEmployeeArgs) {
    return this.employeeService.find(args);
  }

  @Query(() => Employee, { name: 'findEmployee' })
  async findOne(@Args('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Mutation(() => Employee, { name: 'createEmployee' })
  async create(@Args('input') input: EmployeeInput) {
    return this.employeeService.create(input);
  }

  @Query(() => Employee, { name: 'currentEmployee', nullable: true })
  @UseGuards(JwtAuthGuard)
  getEmployee(@CurrentUser() user: Employee) {
    return user;
  }
}
