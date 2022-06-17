import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmployeeInput } from './dto/employee.input';
import { Employee } from './entity/employee';
import { EmployeeService } from './employee.service';
import { FindEmployeeArgs } from './dto/findEmployee.args';

@Resolver(() => Employee)
export class TeacherResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [Employee], { name: 'findEmployees' })
  async findAll(@Args() args: FindEmployeeArgs) {
    return this.employeeService.find(args);
  }

  // @Query(() => [Employee], { name: 'findEmployeesNoTeachers' })
  // async findEmployeesNoTeachers(@Args() args: FindEmployeeArgs) {
  //   return this.employeeService.findEmployeesNoTeachers(args);
  // }

  @Mutation(() => Employee, { name: 'createEmployee' })
  async create(@Args('input') input: EmployeeInput) {
    return this.employeeService.create(input);
  }
}
