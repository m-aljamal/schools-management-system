import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { Student } from './entity/student';
import { ArchiveModule } from 'src/archive/archive.module';
import { LevelModule } from 'src/level/level.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), ArchiveModule, LevelModule],
  providers: [StudentService, StudentResolver],
  exports: [StudentService],
})
export class StudentModule {}
