import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelResolver } from './level.resolver';
import { Level } from './entity/level';
import { ArchiveModule } from 'src/archive/archive.module';

@Module({
  imports: [TypeOrmModule.forFeature([Level]), forwardRef(() => ArchiveModule)],
  providers: [LevelService, LevelResolver],
  exports: [LevelService],
})
export class LevelModule {}
