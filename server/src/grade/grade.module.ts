import { StudentModule } from 'src/student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeResolver } from './grade.resolver';
import { Grade } from './entity/grade';

@Module({
  imports: [TypeOrmModule.forFeature([Grade]), StudentModule],
  providers: [GradeService, GradeResolver],
})
export class GradeModule {}
