import { SubjectModule } from './../subject/subject.module';
import { StudentModule } from 'src/student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeResolver } from './grade.resolver';
import { Grade } from './entity/grade';
import { ExamModule } from 'src/exam/exam.module';
import { ExamResultModule } from 'src/exam-result/exam-result.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Grade]),
    StudentModule,
    SubjectModule,
    ExamModule,
    ExamResultModule,
  ],
  providers: [GradeService, GradeResolver],
})
export class GradeModule {}
