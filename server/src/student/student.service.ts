import { FindStudentsArgs, FindStudentArgs } from './dto/findStudents.args';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Student } from './entity/student';
import { Repository } from 'typeorm';
import { StudentInput } from './dto/student.input';
import { ArchiveService } from 'src/archive/archive.service';
import { LevelService } from 'src/level/level.service';
import { hashPassword } from 'utils/hashPassword';
import { DivisionService } from 'src/division/division.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    private readonly archiveService: ArchiveService,
    private readonly levelService: LevelService,
    private readonly divisionService: DivisionService,
  ) {}

  async findAll(args: FindStudentsArgs) {
    const query = this.studentRepo.createQueryBuilder('student');
    query.leftJoinAndSelect('student.levels', 'level');
    query.andWhere('level.archiveId = :archiveId', {
      archiveId: args.archiveId,
    });
    query.leftJoinAndSelect('student.divisions', 'division');
    query.leftJoinAndSelect('level.divisions', 'divisions');
    query.andWhere('divisions.id IN (division.id)');
    return await query.getMany();
  }

  async findStudent(args: FindStudentArgs): Promise<Student> {
    const query = this.studentRepo.createQueryBuilder('student');
    query.where('student.id = :id', { id: args.id });
    query.leftJoinAndSelect('student.levels', 'level');
    query.andWhere('level.archiveId = :archiveId', {
      archiveId: args.archiveId,
    });
    query.leftJoinAndSelect('level.divisions', 'divisions');
    query.leftJoinAndSelect('student.divisions', 'division');
    query.andWhere('divisions.id IN (division.id)');

    return await query.getOne();
  }
  async create(input: StudentInput) {
    let levels = [];
    let divisions = [];
    let archives = [];
    levels = await Promise.all(
      input.levels.map(async (id) => {
        const level = await this.levelService.findOne(id);
        if (!level) {
          throw new BadRequestException('?????????????? ?????? ????????????');
        }
        return level;
      }),
    );
    divisions = await Promise.all(
      input.divisions.map(async (id) => {
        const division = await this.divisionService.findOne(id);
        if (!division) {
          throw new BadRequestException('???????????? ?????? ??????????');
        }
        return division;
      }),
    );
    archives = await Promise.all(
      input.archives.map(async (id) => {
        const archive = await this.archiveService.findById(id);
        if (!archive) {
          throw new BadRequestException('?????????????? ?????? ??????????');
        }
        return archive;
      }),
    );

    const student = this.studentRepo.create({
      ...input,
      password: hashPassword(input.password),
      levels,
      divisions,
      archives,
    });
    return await this.studentRepo.save(student);
  }

  async findByUserName(username: string) {
    return await this.studentRepo.findOne({
      where: { username },
    });
  }
  async findOne(id: string) {
    return await this.studentRepo.findOne({
      where: { id },
      relations: ['grades'],
    });
  }
}
