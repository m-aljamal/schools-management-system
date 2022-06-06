import { TeacherInput } from './dto/teacher.input';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entity/teacher';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
  ) {}

  async find() {
    return await this.teacherRepo.find();
  }

  async create(input: TeacherInput) {
    return this.teacherRepo.save(input);
  }
}
