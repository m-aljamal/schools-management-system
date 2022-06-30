import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArchiveService } from 'src/archive/archive.service';
import { Repository } from 'typeorm';
import { ProjectInput } from './dto/project.input';
import { UpdateProject } from './dto/project.update';
import { Project } from './entity/project';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly archiveService: ArchiveService,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['archives'],
    });
  }

  async create(input: ProjectInput) {
    const project = await this.projectRepository.save(input);

    const archive = await this.archiveService.create({
      projectId: project.id,
      name: input.current_archive_name,
    });

    await this.projectRepository.save({
      ...project,
      current_archive_name: archive.name,
      current_archive_id: archive.id,
    });
    return project;
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
