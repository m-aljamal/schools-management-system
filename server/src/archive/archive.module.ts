import { EmployeeModule } from 'src/employee/employee.module';
import { LevelModule } from 'src/level/level.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { ArchiveResolver } from './archive.resolver';
import { ArchiveService } from './archive.service';
import { Archive } from './entity/archive';
import { ProjectModule } from 'src/project/project.module';
import { SemesterModule } from 'src/semester/semester.module';
import { DivisionModule } from 'src/division/division.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Archive]),
    forwardRef(() => ProjectModule),
    forwardRef(() => LevelModule),
    forwardRef(() => EmployeeModule),
    // EmployeeModule,
    SemesterModule,
    DivisionModule,
  ],
  providers: [ArchiveResolver, ArchiveService],
  exports: [ArchiveService],
})
export class ArchiveModule {}
