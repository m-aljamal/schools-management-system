import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StudentPassLevelService } from './student-pass-level.service';
import { StudentPassLevelResolver } from './student-pass-level.resolver';
import { StudentPassLevel } from './entity/student-pass-level';

@Module({
  imports: [TypeOrmModule.forFeature([StudentPassLevel])],
  providers: [StudentPassLevelService, StudentPassLevelResolver],
})
export class StudentPassLevelModule {}
