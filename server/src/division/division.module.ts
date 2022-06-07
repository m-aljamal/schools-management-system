import { Module } from '@nestjs/common';
import { DivisionService } from './division.service';
import { DivisionResolver } from './division.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Division } from './entity/division';
import { ArchiveModule } from 'src/archive/archive.module';

@Module({
  imports: [TypeOrmModule.forFeature([Division]), ArchiveModule],
  providers: [DivisionService, DivisionResolver],
})
export class DivisionModule {}
