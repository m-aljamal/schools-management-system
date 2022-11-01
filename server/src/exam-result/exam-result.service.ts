import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamResultInput } from './dto/exam-result.input';
import { ExamResult } from './entity/exam-result';

@Injectable()
export class ExamResultService {
  constructor(
    @InjectRepository(ExamResult)
    private readonly examResultRepo: Repository<ExamResult>,
  ) {}

  async create(input: ExamResultInput): Promise<ExamResult> {
    return await this.examResultRepo.save(input);
  }

  async findStudentExamResult(studentId: string): Promise<ExamResult> {
    return await this.examResultRepo.findOne({
      where: {
        studentId,
      },
    });
  }
}
