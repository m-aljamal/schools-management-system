import { Archive } from './entity/archive';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArchiveInput } from './dto/archive.input';
import { FindArchiveArgs } from './dto/findArchive.args';
import { NotFoundError } from 'rxjs';

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

  async findOne(input: FindArchiveArgs): Promise<Archive> {
    const query = this.archiveRepository.createQueryBuilder('archive');
    query.where('archive.name = :name', { name: input.name });
    const archive = await query.getOne();
    if (!archive) {
      throw new NotFoundException('Archive not found');
    }
    query.leftJoinAndSelect('archive.levels', 'level');
    query.leftJoinAndSelect('level.divisions', 'division');
    query.leftJoinAndSelect('division.employees', 'employee');
    query.leftJoinAndSelect('division.students', 'student');

    return await query.getOne();
  }
}
