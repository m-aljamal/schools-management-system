import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AbsentStudentResolver } from './absent-student.resolver';
import { AbsentStudentService } from './absent-student.service';
import { AbsentStudent } from './entity/absent-student';

@Module({
  imports: [TypeOrmModule.forFeature([AbsentStudent])],
  providers: [AbsentStudentResolver, AbsentStudentService],
})
export class AbsentStudentModule {}
