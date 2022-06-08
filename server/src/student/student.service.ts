import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Student } from './entity/student';
import { Repository } from 'typeorm';
import { StudentInput } from './dto/student.input';
import { ArchiveService } from 'src/archive/archive.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    private readonly archiveService: ArchiveService,
  ) {}

  async findAll() {
    return await this.studentRepo.find({
      relations: ['archives', 'absentStudents'],
    });
  }

  async create(input: StudentInput) {
    const archives = await Promise.all(
      input.archives.map(async (id) => {
        const archive = await this.archiveService.findOne(id);
        if (!archive) {
          throw new BadRequestException('الارشيف غير موجود');
        }
        return archive;
      }),
    );
    const student = this.studentRepo.create({
      ...input,
      archives,
    });
    return await this.studentRepo.save(student);
  }
}
