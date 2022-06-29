import { FindLevelArgs } from './dto/FindLevel.args';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ArchiveService } from 'src/archive/archive.service';
import { Archive } from 'src/archive/entity/archive';
import { LevelInput } from './dto/level.input';
import { LevelUpdateInput } from './dto/level.update';
import { Level } from './entity/level';
import { LevelService } from './level.service';

@Resolver(() => Level)
export class LevelResolver {
  constructor(
    private readonly levelService: LevelService,
    private readonly archiveService: ArchiveService,
  ) {}

  @Query(() => [Level], { name: 'find_levels_divisions' })
  async find_levels_divisions(@Args() args: FindLevelArgs): Promise<Level[]> {
    return this.levelService.find_levels_divisions(args);
  }

  @Query(() => [Level], { name: 'find_levels_divisions_students' })
  async find_levels_divisions_students(
    @Args() args: FindLevelArgs,
  ): Promise<Level[]> {
    return this.levelService.find_levels_divisions_students(args);
  }

  @Query(() => [Level], { name: 'find_levels_divisions_employees' })
  async find_levels_divisions_employees(
    @Args() args: FindLevelArgs,
  ): Promise<Level[]> {
    return this.levelService.find_levels_divisions_employees(args);
  }

  @Query(() => [Level], { name: 'find_levels_divisions_employees_students' })
  async find_levels_divisions_employees_students(
    @Args() args: FindLevelArgs,
  ): Promise<Level[]> {
    return this.levelService.find_levels_divisions_employees_students(args);
  }

  @Mutation(() => Level, { name: 'createLevel' })
  async createLevel(@Args('input') levelInput: LevelInput) {
    return this.levelService.create(levelInput);
  }

  @Mutation(() => Level, { name: 'updateLevel' })
  async updateLevel(
    @Args('id') id: string,
    @Args('input') levelInput: LevelUpdateInput,
  ) {
    return this.levelService.update(id, levelInput);
  }

  @ResolveField(() => Level)
  async archive(@Parent() level: Level): Promise<Archive> {
    return await this.archiveService.findById(level.archiveId);
  }
}
