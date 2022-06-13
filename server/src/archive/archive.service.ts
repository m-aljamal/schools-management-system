import { Archive } from './entity/archive';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArchiveInput } from './dto/archive.input';

@Injectable()
export class ArchiveService {
  constructor(
    @InjectRepository(Archive)
    private readonly archiveRepository: Repository<Archive>,
  ) {}

  async findAll(): Promise<Archive[]> {
    const query = this.archiveRepository.createQueryBuilder('archive');
    query.leftJoinAndSelect('archive.levels', 'level');
    query.leftJoinAndSelect('level.divisions', 'division');
    query.leftJoinAndSelect('division.employees', 'employee');
    query.leftJoinAndSelect('division.students', 'student');
    return await query.getMany();
  }

  async create(input: ArchiveInput): Promise<Archive> {
    return this.archiveRepository.save(input);
  }

  async findOne(id: string): Promise<Archive> {
    return this.archiveRepository.findOne({
      where: { id },
    });
  }
}
