import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelResolver } from './level.resolver';
import { Level } from './entity/level';
import { ArchiveModule } from 'src/archive/archive.module';

@Module({
  imports: [TypeOrmModule.forFeature([Level]), ArchiveModule],
  providers: [LevelService, LevelResolver],
  exports: [LevelService],
})
export class LevelModule {}
