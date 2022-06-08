import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbsentStudentInput } from './dto/absent-student.input';
import { AbsentStudent } from './entity/absent-student';

@Injectable()
export class AbsentStudentService {
  constructor(
    @InjectRepository(AbsentStudent)
    private readonly absentStudentRepository: Repository<AbsentStudent>,
  ) {}

  async findAll(): Promise<AbsentStudent[]> {
    return this.absentStudentRepository.find();
  }

  async createAbsentStudent(input: AbsentStudentInput) {
    const absentStudent = this.absentStudentRepository.create(input);
    return await this.absentStudentRepository.save(absentStudent);
  }
}
