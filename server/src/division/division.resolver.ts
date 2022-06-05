import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DivisionService } from './division.service';
import { DivisionInput } from './dto/division.input';
import { Division } from './entity/division';

@Resolver()
export class DivisionResolver {
  constructor(private readonly divisionService: DivisionService) {}

  @Query(() => [Division], { name: 'findDivisions' })
  async findDivisions(): Promise<Division[]> {
    return this.divisionService.findAll();
  }

  @Mutation(() => Division, { name: 'createDivision' })
  async createDivision(@Args('input') divisionInput: DivisionInput) {
    return this.divisionService.create(divisionInput);
  }
}
