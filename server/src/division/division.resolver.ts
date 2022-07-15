import { FindDivisionArgs } from './dto/findDivision.args';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Level } from 'src/level/entity/level';
import { LevelService } from 'src/level/level.service';
import { DivisionService } from './division.service';
import { DivisionInput } from './dto/division.input';
import { DivisionUpdateInput } from './dto/division.update';
import { Division } from './entity/division';

@Resolver(() => Division)
export class DivisionResolver {
  constructor(
    private readonly divisionService: DivisionService,
    private readonly levelService: LevelService,
  ) {}

  @Query(() => [Division], { name: 'findDivisions' })
  async findDivisions(@Args() args: FindDivisionArgs): Promise<Division[]> {
    return this.divisionService.findAll(args);
  }

  @Mutation(() => Division, { name: 'createDivision' })
  async createDivision(@Args('input') divisionInput: DivisionInput) {
    return this.divisionService.create(divisionInput);
  }

  @ResolveField(() => Division)
  async level(@Parent() division: Division): Promise<Level> {
    return await this.levelService.findOne(division.levelId);
  }
}
