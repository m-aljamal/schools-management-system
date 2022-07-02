import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArchiveService } from 'src/archive/archive.service';
import { Repository } from 'typeorm';
import { SemesterInput } from './dto/semester.input';
import { Semester } from './entity/semester';

@Injectable()
export class SemesterService {
  constructor(
    @InjectRepository(Semester)
    private readonly semesterRepository: Repository<Semester>,
  ) {}

  async findAll(): Promise<Semester[]> {
    return await this.semesterRepository.find({
      relations: ['archives', 'absentStudents', 'absentEmployees'],
    });
  }

  async create(input: SemesterInput): Promise<Semester> {
    return await this.semesterRepository.save(input);
  }
}
