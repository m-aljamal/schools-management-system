import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { TeacherResolver } from './employee.resolver';
import { Employee } from './entity/employee';
import { ArchiveModule } from 'src/archive/archive.module';
import { LevelModule } from 'src/level/level.module';
import { DivisionModule } from 'src/division/division.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    ArchiveModule,
    LevelModule,
    DivisionModule,
  ],
  providers: [EmployeeService, TeacherResolver],
})
export class TeacherModule {}
