import { ProjectModule } from 'src/project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { TeacherResolver } from './employee.resolver';
import { Employee } from './entity/employee';
import { ArchiveModule } from 'src/archive/archive.module';
import { LevelModule } from 'src/level/level.module';
import { DivisionModule } from 'src/division/division.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    LevelModule,
    DivisionModule,
    forwardRef(() => ProjectModule),
    forwardRef(() => ArchiveModule),
  ],
  providers: [EmployeeService, TeacherResolver],
  exports: [EmployeeService],
})
export class EmployeeModule {}
