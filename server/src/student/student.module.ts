import { DivisionModule } from 'src/division/division.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { Student } from './entity/student';
import { ArchiveModule } from 'src/archive/archive.module';
import { LevelModule } from 'src/level/level.module';
import { SubjectModule } from 'src/subject/subject.module';
import { ExamResultModule } from 'src/exam-result/exam-result.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    forwardRef(() => ArchiveModule),
    LevelModule,
    DivisionModule,
    SubjectModule,
    ExamResultModule,
  ],
  providers: [StudentService, StudentResolver],
  exports: [StudentService],
})
export class StudentModule {}
