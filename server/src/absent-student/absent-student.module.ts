import { Module } from '@nestjs/common';
import { AbsentStudentResolver } from './absent-student.resolver';
import { AbsentStudentService } from './absent-student.service';

@Module({
  providers: [AbsentStudentResolver, AbsentStudentService]
})
export class AbsentStudentModule {}
