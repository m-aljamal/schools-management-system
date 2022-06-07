import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { SemesterResolver } from './semester.resolver';
import { Semester } from './entity/semester';
import { ArchiveModule } from 'src/archive/archive.module';

@Module({
  imports: [TypeOrmModule.forFeature([Semester]), ArchiveModule],
  providers: [SemesterService, SemesterResolver],
})
export class SemesterModule {}
