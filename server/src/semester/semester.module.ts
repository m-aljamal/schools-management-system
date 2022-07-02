import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { SemesterResolver } from './semester.resolver';
import { Semester } from './entity/semester';

@Module({
  imports: [TypeOrmModule.forFeature([Semester])],
  providers: [SemesterService, SemesterResolver],
  exports: [SemesterService],
})
export class SemesterModule {}
