import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { TeacherResolver } from './employee.resolver';
import { Employee } from './entity/employee';
import { ArchiveModule } from 'src/archive/archive.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), ArchiveModule],
  providers: [EmployeeService, TeacherResolver],
})
export class TeacherModule {}
