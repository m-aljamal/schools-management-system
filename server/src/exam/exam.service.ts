import { ExamInput } from './dto/exam.input';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './entity/exam';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepo: Repository<Exam>,
  ) {}

  async find(): Promise<Exam[]> {
    return await this.examRepo.find();
  }

  async create(input: ExamInput): Promise<Exam> {
    return await this.examRepo.save(input);
  }
}
