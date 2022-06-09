import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArchiveService } from 'src/archive/archive.service';
import { Repository } from 'typeorm';
import { SemesterInput } from './dto/semester.input';
import { Semester } from './entity/semester';

@Injectable()
export class SemesterService {
  constructor(
    @InjectRepository(Semester)
    private readonly semesterRepository: Repository<Semester>,
    private readonly archiveService: ArchiveService,
  ) {}

  async findAll(): Promise<Semester[]> {
    return await this.semesterRepository.find({
      relations: ['archives', 'absentStudents', 'absentEmployees'],
    });
  }

  async create(input: SemesterInput): Promise<Semester> {
    const archives = await Promise.all(
      input.archives.map(async (id) => {
        const archive = await this.archiveService.findOne(id);
        if (!archive) {
          throw new BadRequestException('الارشيف غير موجود');
        }
        return archive;
      }),
    );
    const semester = this.semesterRepository.create({
      ...input,
      archives,
    });
    return await this.semesterRepository.save(semester);
  }
}
