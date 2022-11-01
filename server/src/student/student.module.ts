import { DivisionModule } from 'src/division/division.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { Student } from './entity/student';
import { ArchiveModule } from 'src/archive/archive.module';
import { LevelModule } from 'src/level/level.module';
import { SubjectModule } from 'src/subject/subject.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    forwardRef(() => ArchiveModule),
    LevelModule,
    DivisionModule,
    SubjectModule,
  ],
  providers: [StudentService, StudentResolver],
  exports: [StudentService],
})
export class StudentModule {}
