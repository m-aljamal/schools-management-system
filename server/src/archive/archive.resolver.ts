import { ArchiveService } from './archive.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Archive } from './entity/archive';
import { ArchiveInput } from './dto/archive.input';

@Resolver(() => Archive)
export class ArchiveResolver {
  constructor(private readonly archiveService: ArchiveService) {}

  @Query(() => [Archive], { name: 'findAllArchives' })
  async findAll(): Promise<Archive[]> {
    return this.archiveService.findAll();
  }

  @Mutation(() => Archive, { name: 'createArchive' })
  async create(@Args('input') input: ArchiveInput): Promise<Archive> {
    return this.archiveService.create(input);
  }
}