import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmployeeInput } from './dto/employee.input';
import { Employee } from './entity/employee';
import { EmployeeService } from './employee.service';

@Resolver(() => Employee)
export class TeacherResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [Employee], { name: 'findEmployee' })
  async findAll() {
    return this.employeeService.find();
  }

  @Mutation(() => Employee, { name: 'createEmployee' })
  async create(@Args('input') input: EmployeeInput) {
    return this.employeeService.create(input);
  }
}
