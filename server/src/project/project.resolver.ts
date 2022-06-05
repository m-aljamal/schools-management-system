import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectInput } from './dto/project.input';
import { Project } from './entity/project';
import { ProjectService } from './project.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [Project], { name: 'findProjects' })
  async projects(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Mutation(() => Project, { name: 'createProject' })
  async createProject(@Args('input') input: ProjectInput) {
    return this.projectService.create(input);
  }
}
