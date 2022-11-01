import { FindStudentsArgs, FindStudentArgs } from './dto/findStudents.args';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { Student } from './entity/student';
import { Repository } from 'typeorm';
import { StudentInput } from './dto/student.input';
import { ArchiveService } from 'src/archive/archive.service';
import { LevelService } from 'src/level/level.service';
import { hashPassword } from 'utils/hashPassword';
import { DivisionService } from 'src/division/division.service';
import { SubjectService } from 'src/subject/subject.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @Inject(forwardRef(() => ArchiveService))
    private readonly archiveService: ArchiveService,
    private readonly levelService: LevelService,
    private readonly divisionService: DivisionService,
    private readonly subjectService: SubjectService,
  ) {}

  async findAll(args: FindStudentsArgs) {
    const query = this.studentRepo.createQueryBuilder('student');
    query.leftJoinAndSelect('student.levels', 'level');
    // query.andWhere('level.archiveId = :archiveId', {
    //   archiveId: args.archiveId,
    // });
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

  async seedStudents(input: StudentInput) {
    const archive = await this.archiveService.findById(input.archives[0]);
    const levels = await this.levelService.findLevels(input.archives[0]);
    for (let i = 0; i < 25; i++) {
      const student = await this.studentRepo.create({
        password: hashPassword('123456'),
        username: `student${i}`,
        name: `student${i}`,
        projectId: input.projectId,
        archives: [archive],
        levels: [levels[i % levels.length]],
        divisions: [
          levels[i % levels.length].divisions[
            i % levels[i % levels.length].divisions.length
          ],
        ],
      });
      await this.studentRepo.save(student);
    }
  }

  async create(input: StudentInput) {
    let levels = [];
    let divisions = [];
    let archives = [];
    levels = await Promise.all(
      input.levels.map(async (id) => {
        const level = await this.levelService.findOne(id);
        if (!level) {
          throw new BadRequestException('المرحلة غير موجودة');
        }
        return level;
      }),
    );
    divisions = await Promise.all(
      input.divisions.map(async (id) => {
        const division = await this.divisionService.findOne(id);
        if (!division) {
          throw new BadRequestException('الشعبة غير موجود');
        }
        return division;
      }),
    );
    archives = await Promise.all(
      input.archives.map(async (id) => {
        const archive = await this.archiveService.findById(id);
        if (!archive) {
          throw new BadRequestException('الارشيف غير موجود');
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
      relations: ['grades', 'levels'],
    });
  }

  async AddNewArchiveToStudents(
    currentArchiveId: string,
    // newArchiveId: string,
  ) {
    const query = this.studentRepo.createQueryBuilder('student');
    query.leftJoinAndSelect('student.archives', 'archive');
    query.andWhere('archive.id = :id', { id: currentArchiveId });
    query.leftJoinAndSelect('student.levels', 'level');
    query.leftJoinAndSelect('level.archives', 'archives');
    query.leftJoinAndSelect('level.subjects', 'subjects');
    query.leftJoinAndSelect('student.grades', 'grade');
    const students = await query.getMany();

    for (const student of students) {
      console.log(student.levels[0].subjects);
      
    }

    // // add new archive id to students
    // const archive = await this.archiveService.findById(newArchiveId);
    // for (const student of students) {
    //   student.archives = [...student.archives, archive];
    //   await this.studentRepo.save(student);
    // }

    // // find the passed grades students
    // const passedStudents = students.filter((student) => {
    //   return student.grades.every((grade) => grade.passTheExam);
    // });

    // for (const student of passedStudents) {
    //   // find the last student level
    //   const lastStudentLevel = Math.max(
    //     ...student.levels.map((level) => level.number),
    //   );
    //   // find the next student level
    //   const nextStudentLevel = await this.levelService.findTheNextLevel(
    //     lastStudentLevel,
    //   );
    //   student.levels = [...student.levels, nextStudentLevel];
    //   await this.studentRepo.save(student);

    //   // find the next level id by the last level number
    // }

    // return students;
   }
}
