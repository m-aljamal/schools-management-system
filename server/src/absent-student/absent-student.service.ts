import { AbsentArgs } from './../shared/absentArgs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbsentStudent } from 'src/shared/AbsentEntity';
import { Repository } from 'typeorm';
import { AbsentStudentInput } from './dto/absent-student.input';
import {
  filterByApproved,
  filterByDate,
  filterByExactDate,
  filterByName,
} from 'src/shared/filtersAbsentFunctions';
@Injectable()
export class AbsentStudentService {
  constructor(
    @InjectRepository(AbsentStudent)
    private readonly absentStudentRepository: Repository<AbsentStudent>,
  ) {}

  async findAll(args: AbsentArgs): Promise<AbsentStudent[]> {
    const query =
      this.absentStudentRepository.createQueryBuilder('absent_student');
    query.leftJoinAndSelect('absent_student.student', 'student');
    query.leftJoinAndSelect('absent_student.archive', 'archive');
    query.leftJoinAndSelect('student.levels', 'level');
    if (args.levelId) {
      query.andWhere('level.id = :levelId', { levelId: args.levelId });
    }
    query.andWhere('archive.id = :archiveId', { archiveId: args.archiveId });
    filterByExactDate({
      date: args.date,
      query,
      sqlTable: 'absent_student',
    });
    filterByApproved({
      approved: args.approved,
      query,
      sqlTable: 'absent_student',
    });
    filterByName({
      name: args.name,
      query: query,
      type: 'student',
    });
    filterByDate({
      fromDate: args.fromDate,
      toDate: args.toDate,
      query,
      sqlTable: 'absent_student',
    });
    return await query.getMany();
  }

  async createAbsentStudent(input: AbsentStudentInput) {
    const absentStudent = this.absentStudentRepository.create(input);
    return await this.absentStudentRepository.save(absentStudent);
  }
}
