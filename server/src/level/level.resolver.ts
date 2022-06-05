import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LevelInput } from './dto/level.input';
import { Level } from './entity/level';
import { LevelService } from './level.service';

@Resolver(() => Level)
export class LevelResolver {
  constructor(private readonly levelService: LevelService) {}

  @Query(() => [Level], { name: 'findLevels' })
  async findLevels(): Promise<Level[]> {
    return this.levelService.findAll();
  }

  @Mutation(()=> Level, {name: "createLevel"})
  async createLevel(@Args('input')levelInput : LevelInput){
    return this.levelService.create(levelInput)
  }
}
