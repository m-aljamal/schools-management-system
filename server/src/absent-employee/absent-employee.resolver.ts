import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AbsentEmployeeService } from './absent-employee.service';
import { AbsentEmployeeInput } from './dto/absent-employee.input';
import { AbsentEmployee } from './entity/absent-employee';

@Resolver(() => AbsentEmployee)
export class AbsentEmployeeResolver {
  constructor(private readonly absentEmployeeService: AbsentEmployeeService) {}

  @Query(() => [AbsentEmployee], { name: 'findAbsentEmployees' })
  async getAbsentEmployees(): Promise<AbsentEmployee[]> {
    return this.absentEmployeeService.findAll();
  }

  @Mutation(() => AbsentEmployee, { name: 'createAbsentEmployee' })
  async createAbsentEmployee(
    @Args('input') input: AbsentEmployeeInput,
  ): Promise<AbsentEmployee> {
    return this.absentEmployeeService.createAbsentEmployee(input);
  }
}
