import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
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
import { ArchiveInput, OpenNewArchive } from './dto/archive.input';
import { Project } from 'src/project/entity/project';
import { ProjectService } from 'src/project/project.service';
import { FindArchiveArgs, FindArchivesArgs } from './dto/findArchive.args';
import { hasRoles } from 'src/auth/roles.decorator';
import { Role } from 'utils/enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Resolver(() => Archive)
export class ArchiveResolver {
  constructor(
    private readonly archiveService: ArchiveService,
    private readonly projectService: ProjectService,
  ) {}

  // @hasRoles(Role.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => [Archive], { name: 'findArchives' })
  async findAll(@Args() findArgs: FindArchivesArgs): Promise<Archive[]> {
    return this.archiveService.findAll(findArgs);
  }

  @Query(() => Archive, { name: 'findArchive' })
  async findArchive(@Args() findArgs: FindArchiveArgs): Promise<Archive> {
    return this.archiveService.findOne(findArgs);
  }

  @Mutation(() => Archive, { name: 'createArchive' })
  async create(@Args('input') input: ArchiveInput): Promise<Archive> {
    return this.archiveService.create(input);
  }

  @Mutation(() => Archive, { name: 'openNewArchive' })
  async openNewArchive(@Args('input') input: OpenNewArchive) {
    return this.archiveService.openNewArchive(input);
  }

  @Mutation(() => Archive, { name: 'removeArchive' })
  async remove(@Args('id') id: string) {
    return this.archiveService.remove(id);
  }

  @ResolveField(() => Archive)
  async project(@Parent() archive: Archive): Promise<Project> {
    return this.projectService.findOne(archive.projectId);
  }
}
