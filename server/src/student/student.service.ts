import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Student } from './entity/student';
import { Repository } from 'typeorm';
import { StudentInput } from './dto/student.input';
import { ArchiveService } from 'src/archive/archive.service';
import { LevelService } from 'src/level/level.service';
import { hashPassword } from 'utils/hashPassword';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    private readonly archiveService: ArchiveService,
    private readonly levelService: LevelService,
  ) {}

  async findAll() {
    return await this.studentRepo.find({
      relations: ['archives', 'absentStudents', 'levels'],
    });
  }

  async create(input: StudentInput) {
    // const archives = await Promise.all(
    //   input.archives.map(async (id) => {
    //     const archive = await this.archiveService.findOne(id);
    //     if (!archive) {
    //       throw new BadRequestException('الارشيف غير موجود');
    //     }
    //     return archive;
    //   }),
    // );
    // const levels = await Promise.all(
    //   input.levels.map(async (id) => {
    //     const level = await this.levelService.findOne(id);
    //     if (!level) {
    //       throw new BadRequestException('المرحلة غير موجودة');
    //     }
    //     return level;
    //   }),
    // );

    // const student = this.studentRepo.create({
    //   ...input,
    //   // archives,
    //   levels,
    // });
    const student = this.studentRepo.create({
      ...input,
      password: hashPassword(input.password),
    });
    return await this.studentRepo.save(student);
  }

  async findByUserName(username: string) {
    return await this.studentRepo.findOne({
      where: { username },
      // relations: ['archives', 'absentStudents', 'levels'],
    });
  }
}
