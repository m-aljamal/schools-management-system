import { FindSubject } from './dto/findSubject.args';
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
    });
  }

  async findSubjects_for_grades(args: FindSubject): Promise<Subject[]> {
    const query = this.subjectRepository.createQueryBuilder('subject');
    // query.andWhere('subject.levelId = :levelId', { levelId: args.levelId });
    query.leftJoinAndSelect('subject.level', 'level');
    query.leftJoinAndSelect('subject.grades', 'grades');
    query.andWhere('grades.semesterId = :semesterId', {
      semesterId: args.semesterId,
    });
    query.leftJoinAndSelect('grades.semester', 'semester');
    return query.getMany();
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
