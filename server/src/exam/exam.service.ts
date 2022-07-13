import { ExamInput } from './dto/exam.input';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './entity/exam';
import { FindExamArgs } from './dto/findExam.args';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepo: Repository<Exam>,
  ) {}

  async find(args: FindExamArgs): Promise<Exam[]> {
    const query = this.examRepo.createQueryBuilder('exam');
    query.where('exam.semesterId = :semesterId', {
      semesterId: args.semesterId,
    });
    query.leftJoinAndSelect('exam.grades', 'grade');

    if (args.subjectId) {
      query.andWhere('grade.subjectId = :subjectId', {
        subjectId: args.subjectId,
      });
    }
    return await query.getMany();
  }

  async create(input: ExamInput): Promise<Exam> {
    return await this.examRepo.save(input);
  }
}
