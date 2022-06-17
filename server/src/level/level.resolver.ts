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

  @Query(() => [Level], { name: 'findLevels' })
  async findLevels(@Args() args: FindLevelArgs): Promise<Level[]> {
    return this.levelService.findAll(args);
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
