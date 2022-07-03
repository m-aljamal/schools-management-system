import { Subject } from './entity/subject';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectResolver } from './subject.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  providers: [SubjectService, SubjectResolver],
})
export class SubjectModule {}
