import { ArchiveService } from './archive.service';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Archive } from './entity/archive';
import { ArchiveInput } from './dto/archive.input';
import { Project } from 'src/project/entity/project';
import { ProjectService } from 'src/project/project.service';
import { FindArchiveArgs } from './dto/findArchive.args';

@Resolver(() => Archive)
export class ArchiveResolver {
  constructor(
    private readonly archiveService: ArchiveService,
    private readonly projectService: ProjectService,
  ) {}

  @Query(() => [Archive], { name: 'findAllArchives' })
  async findAll(): Promise<Archive[]> {
    return this.archiveService.findAll();
  }

  @Query(() => Archive, { name: 'findArchive' })
  async findOne(@Args() input: FindArchiveArgs): Promise<Archive> {
    return this.archiveService.findOne(input);
  }

  @Mutation(() => Archive, { name: 'createArchive' })
  async create(@Args('input') input: ArchiveInput): Promise<Archive> {
    return this.archiveService.create(input);
  }

  @ResolveField(() => Archive)
  async project(@Parent() archive: Archive): Promise<Project> {
    return this.projectService.findOne(archive.projectId);
  }
}
