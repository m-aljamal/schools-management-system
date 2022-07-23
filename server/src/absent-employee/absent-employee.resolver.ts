import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AbsentArgs } from 'src/shared/absentArgs';
import { AbsentEmployee } from 'src/shared/AbsentEntity';
import { TotalAbsent } from 'src/shared/totalAbsent';
import { AbsentEmployeeService } from './absent-employee.service';
import { AbsentEmployeeInput } from './dto/absent-employee.input';

@Resolver(() => AbsentEmployee)
export class AbsentEmployeeResolver {
  constructor(private readonly absentEmployeeService: AbsentEmployeeService) {}

  @Query(() => [AbsentEmployee], { name: 'findAbsentEmployees' })
  async getAllEmpabsent(@Args() args: AbsentArgs): Promise<AbsentEmployee[]> {
    return await this.absentEmployeeService.getAllAbsentEmployees(args);
  }

  @Query(() => [TotalAbsent], { name: 'findTotalAbsentEmployees' })
  async getTotalEmpabsent(@Args() args: AbsentArgs) {
    return await this.absentEmployeeService.getTotalAbsentEmployees(args);
  }

  @Mutation(() => AbsentEmployee, { name: 'createAbsentEmployee' })
  async createAbsentEmployee(
    @Args('input') input: AbsentEmployeeInput,
  ): Promise<AbsentEmployee> {
    return this.absentEmployeeService.createAbsentEmployee(input);
  }
}
