import { ArchiveService } from './archive.service';
import { Resolver, Query } from '@nestjs/graphql';
import { Archive } from './entity/archive';

@Resolver(() => Archive)
export class ArchiveResolver {
  constructor(private readonly archiveService: ArchiveService) {}

  @Query(() => [Archive], { name: 'FindAllArchives' })
  async findAll(): Promise<Archive[]> {
    return this.archiveService.findAll();
  }
}
