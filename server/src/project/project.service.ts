import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectInput } from './dto/project.input';
import { UpdateProject } from './dto/project.update';
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
  async findOne(id: string): Promise<Project> {
    return this.projectRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, input: UpdateProject): Promise<Project> {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException('المشروع غير موجود');
    }
    Object.assign(project, input);
    return this.projectRepository.save(project);
  }
}
