import { AbsentArgs } from './../shared/absentArgs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbsentStudent } from 'src/shared/AbsentEntity';
import { Repository } from 'typeorm';
import { AbsentStudentInput } from './dto/absent-student.input';
import {
  findAllAbsent,
  findTotalAbsent,
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

    findAllAbsent({
      args,
      query,
      sqlTable: 'absent_student',
      type: 'student',
    });

    query.andWhere('level.archive.id = :archiveId', {
      archiveId: args.archiveId,
    });

    return await query.getMany();
  }

  async getTotalAbsentStudents(args: AbsentArgs) {
    const query =
      this.absentStudentRepository.createQueryBuilder('absent_student');

    findTotalAbsent({
      args,
      query,
      sqlTable: 'absent_student',
      type: 'student',
    });
    return await query.getRawMany();
  }

  async createAbsentStudent(input: AbsentStudentInput) {
    const absentStudent = this.absentStudentRepository.create(input);
    return await this.absentStudentRepository.save(absentStudent);
  }
}
