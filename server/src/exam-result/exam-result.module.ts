import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ExamResultService } from './exam-result.service';
import { ExamResultResolver } from './exam-result.resolver';
import { ExamResult } from './entity/exam-result';

@Module({
  imports: [TypeOrmModule.forFeature([ExamResult])],
  providers: [ExamResultService, ExamResultResolver],
  exports: [ExamResultService],
})
export class ExamResultModule {}
