import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectInput } from './dto/project.input';
import { Project } from './entity/project';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['archives'],
    });
  }

  async create(input: ProjectInput): Promise<Project> {
    return this.projectRepository.save(input);
  }
}
