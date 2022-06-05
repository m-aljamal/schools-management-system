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
    return this.archiveRepository.find();
  }

  async create(input: ArchiveInput): Promise<Archive> {
    return this.archiveRepository.save(input);
  }
}
