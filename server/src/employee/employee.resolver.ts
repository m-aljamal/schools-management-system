import { CurrentUser } from './../auth/current-user.decorator';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AddNewArc, EmployeeInput } from './dto/employee.input';
import { Employee } from './entity/employee';
import { EmployeeService } from './employee.service';
import { FindEmployeesArgs, FindEmployeeArgs } from './dto/findEmployee.args';
import { UseGuards } from '@nestjs/common';
import { Project } from 'src/project/entity/project';
import { ProjectService } from 'src/project/project.service';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly projectService: ProjectService,
  ) {}

  @Query(() => [Employee], { name: 'findTeachers' })
  async findTeachers(@Args() args: FindEmployeesArgs) {
    return this.employeeService.findTeachers(args);
  }

  @Query(() => [Employee], { name: 'findManagers' })
  async findManagers(@Args() args: FindEmployeesArgs) {
    return this.employeeService.findManagers(args);
  }

  @Query(() => Employee, { name: 'findEmployee' })
  async findOne(@Args() args: FindEmployeeArgs) {
    return this.employeeService.findOne(args);
  }

  @Mutation(() => Employee, { name: 'createEmployee' })
  async create(@Args('input') input: EmployeeInput) {
    return this.employeeService.create(input);
  }

  @Mutation(() => Employee, { name: 'employeeSeed' })
  async seed(@Args('input') input: EmployeeInput) {
    return this.employeeService.seed(input);
  }

  @ResolveField(() => Employee)
  async project(@Parent() employee: Employee): Promise<Project> {
    return this.projectService.findOne(employee.projectId);
  }
}
