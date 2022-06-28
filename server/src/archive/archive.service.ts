import { Archive } from './entity/archive';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArchiveInput } from './dto/archive.input';
import { FindArchiveArgs, FindArchivesArgs } from './dto/findArchive.args';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ArchiveService {
  constructor(
    @InjectRepository(Archive)
    private readonly archiveRepository: Repository<Archive>,
  ) {}

  async findAll(findArgs: FindArchivesArgs): Promise<Archive[]> {
    const query = this.archiveRepository.createQueryBuilder('archive');
    query.where('archive.projectId = :projectId', {
      projectId: findArgs.projectId,
    });
    if (findArgs.name) {
      query.andWhere('archive.name = :name', { name: findArgs.name });
    }
    if (findArgs.sortBy) {
      query.orderBy('archive.name', findArgs.sortBy);
    }

    return await query.getMany();
  }

  async findOne(findArgs: FindArchiveArgs): Promise<Archive> {
    const query = this.archiveRepository.createQueryBuilder('archive');
    query.where('archive.projectId = :projectId', {
      projectId: findArgs.projectId,
    });
    query.andWhere('archive.name = :name', { name: findArgs.name });
    query.leftJoinAndSelect('archive.levels', 'level');
    query.leftJoinAndSelect('level.divisions', 'division');
    query.leftJoinAndSelect('division.employees', 'employee');
    query.leftJoinAndSelect('division.students', 'student');

    return await query.getOne();
  }

  async create(input: ArchiveInput): Promise<Archive> {
    const findArchive = await this.archiveRepository.findOne({
      where: { projectId: input.projectId, name: input.name },
    });
    if (findArchive) {
      throw new BadRequestException('Archive already exists');
    }

    return this.archiveRepository.save(input);
  }

  async findById(id: string): Promise<Archive> {
    return await this.archiveRepository.findOne({
      where: { id },
    });
  }
}
