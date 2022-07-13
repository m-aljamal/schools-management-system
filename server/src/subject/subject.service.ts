import { SubjectInput } from './dto/subject.input';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Subject } from './entity/subject';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async findAll(levelId: string): Promise<Subject[]> {
    return this.subjectRepository.find({
      where: { levelId },
      relations: ['grades', 'level'],
    });
  }

  async create(subject: SubjectInput): Promise<Subject> {
    return this.subjectRepository.save(subject);
  }
  async findOne(id: string): Promise<Subject> {
    return this.subjectRepository.findOne({
      where: { id },
    });
  }
}
