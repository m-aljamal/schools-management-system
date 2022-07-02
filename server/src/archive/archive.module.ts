import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { ArchiveResolver } from './archive.resolver';
import { ArchiveService } from './archive.service';
import { Archive } from './entity/archive';
import { ProjectModule } from 'src/project/project.module';
import { SemesterModule } from 'src/semester/semester.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Archive]),
    forwardRef(() => ProjectModule),
    SemesterModule,
  ],
  providers: [ArchiveResolver, ArchiveService],
  exports: [ArchiveService],
})
export class ArchiveModule {}
