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
import { EmployeeInput } from './dto/employee.input';
import { Employee } from './entity/employee';
import { EmployeeService } from './employee.service';
import { FindEmployeeArgs } from './dto/findEmployee.args';
import { UseGuards } from '@nestjs/common';
import { Project } from 'src/project/entity/project';
import { ProjectService } from 'src/project/project.service';

@Resolver(() => Employee)
export class TeacherResolver {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly projectService: ProjectService,
  ) {}

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

  @ResolveField(() => Employee)
  async project(@Parent() employee: Employee): Promise<Project> {
    return this.projectService.findOne(employee.projectId);
  }
}
