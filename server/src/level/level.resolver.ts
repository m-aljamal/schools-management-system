import { Resolver, Query } from '@nestjs/graphql';
import { Level } from './entity/level';
import { LevelService } from './level.service';

@Resolver(() => Level)
export class LevelResolver {
  constructor(private readonly levelService: LevelService) {}

  @Query(() => [Level], { name: 'findLevels' })
  async findLevels(): Promise<Level[]> {
    return this.levelService.findAll();
  }
}
