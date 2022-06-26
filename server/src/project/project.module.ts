import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { Project } from './entity/project';
import { ArchiveModule } from 'src/archive/archive.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    forwardRef(() => ArchiveModule),
  ],
  providers: [ProjectService, ProjectResolver],
  exports: [ProjectService],
})
export class ProjectModule {}
