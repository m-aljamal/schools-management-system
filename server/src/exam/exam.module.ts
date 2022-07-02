import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamResolver } from './exam.resolver';
import { Exam } from './entity/exam';

@Module({
  imports: [TypeOrmModule.forFeature([Exam])],
  providers: [ExamService, ExamResolver],
})
export class ExamModule {}
