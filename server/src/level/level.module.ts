import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelResolver } from './level.resolver';
import { Level } from './entity/level';

@Module({
  imports: [TypeOrmModule.forFeature([Level])],
  providers: [LevelService, LevelResolver],
})
export class LevelModule {}
