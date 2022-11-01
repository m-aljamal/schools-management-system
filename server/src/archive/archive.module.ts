import { StudentModule } from './../student/student.module';
import { LevelModule } from 'src/level/level.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { ArchiveResolver } from './archive.resolver';
import { ArchiveService } from './archive.service';
import { Archive } from './entity/archive';
import { ProjectModule } from 'src/project/project.module';
import { SemesterModule } from 'src/semester/semester.module';
import { SubjectModule } from 'src/subject/subject.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Archive]),
    forwardRef(() => ProjectModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => LevelModule),
    forwardRef(() => StudentModule),
    // EmployeeModule,
    SemesterModule,
  ],
  providers: [ArchiveResolver, ArchiveService],
  exports: [ArchiveService],
})
export class ArchiveModule {}
