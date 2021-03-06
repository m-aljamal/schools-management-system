import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AbsentStudentResolver } from './absent-student.resolver';
import { AbsentStudentService } from './absent-student.service';
import { AbsentStudent } from 'src/shared/AbsentEntity';

@Module({
  imports: [TypeOrmModule.forFeature([AbsentStudent])],
  providers: [AbsentStudentResolver, AbsentStudentService],
})
export class AbsentStudentModule {}
