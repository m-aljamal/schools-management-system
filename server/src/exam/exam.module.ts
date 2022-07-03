import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamResolver } from './exam.resolver';
import { Exam } from './entity/exam';
import { LevelModule } from 'src/level/level.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exam]), LevelModule],
  providers: [ExamService, ExamResolver],
})
export class ExamModule {}
