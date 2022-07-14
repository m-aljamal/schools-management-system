import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Student } from './entity/student';
import { Repository } from 'typeorm';
import { StudentInput } from './dto/student.input';
import { ArchiveService } from 'src/archive/archive.service';
import { LevelService } from 'src/level/level.service';
import { hashPassword } from 'utils/hashPassword';
import { DivisionService } from 'src/division/division.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    private readonly archiveService: ArchiveService,
    private readonly levelService: LevelService,
  ) {}

  async findAll(levelId: string): Promise<Student[]> {
    return await this.studentRepo.find({
      where: { levelId },
      relations: ['absentStudents', 'grades'],
    });
  }

  async create(input: StudentInput) {
    const student = this.studentRepo.create({
      ...input,
      password: hashPassword(input.password),
    });
    return await this.studentRepo.save(student);
  }

  async findByUserName(username: string) {
    return await this.studentRepo.findOne({
      where: { username },
    });
  }
  async findOne(id: string) {
    return await this.studentRepo.findOne({
      where: { id },
      relations: ['grades'],
    });
  }
}
