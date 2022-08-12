import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GradeInput } from './dto/grade.input';
import { Grade } from './entity/grade';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
  ) {}

  async findAll(): Promise<Grade[]> {
    return this.gradeRepository.find();
  }

  async createGrade(grade: GradeInput): Promise<Grade> {
    let passTheExam = false;
    if (grade.final_grade > 50) {
      passTheExam = true;
    }
    const newGrade = this.gradeRepository.create({
      ...grade,
      passTheExam,
    });
    return this.gradeRepository.save(newGrade);
  }
}
