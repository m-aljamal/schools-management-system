import { AbsentArgs } from './../shared/absentArgs';
import { FindLevelArgs } from './dto/FindLevel.args';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { LevelInput } from './dto/level.input';
import { LevelUpdateInput } from './dto/level.update';
import { Level } from './entity/level';
import { LevelService } from './level.service';

@Resolver(() => Level)
export class LevelResolver {
  constructor(private readonly levelService: LevelService) {}

  @Query(() => [Level], { name: 'findLevels' })
  async findLevels(@Args('archiveId') archiveId: string): Promise<Level[]> {
    return this.levelService.findLevels(archiveId);
  }

  @Query(() => [Level], { name: 'findSubjects_byLevel' })
  async findSubjects(@Args('archiveId') archiveId: string): Promise<Level[]> {
    return await this.levelService.findSubjects(archiveId);
  }

  @Query(() => Level, { name: 'findLevel' })
  async findLevel(@Args('levelId') levelId: string): Promise<Level> {
    return await this.levelService.findOne(levelId);
  }

  @Query(() => [Level], { name: 'findTechers_levels' })
  async findTechers_levels(
    @Args('archiveId') archiveId: string,
  ): Promise<Level[]> {
    return await this.levelService.findTechers_levels(archiveId);
  }

  @Query(() => [Level], { name: 'findStudents_levels' })
  async findStudents_levels(
    @Args('archiveId') archiveId: string,
  ): Promise<Level[]> {
    return await this.levelService.findStudents_levels(archiveId);
  }

  @Query(() => [Level], { name: 'findAbsentStudents_byLevel' })
  async findAbsentStudents(@Args() args: AbsentArgs) {
    return await this.levelService.findAbsentStudents(args);
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
}
