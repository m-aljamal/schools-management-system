import { Archive } from './entity/archive';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArchiveInput, OpenNewArchive } from './dto/archive.input';
import { FindArchiveArgs, FindArchivesArgs } from './dto/findArchive.args';
import { SemesterService } from 'src/semester/semester.service';
import { semesters } from 'utils/constant';
import { EmployeeService } from 'src/employee/employee.service';
import { LevelService } from 'src/level/level.service';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class ArchiveService {
  constructor(
    @InjectRepository(Archive)
    private readonly archiveRepository: Repository<Archive>,
    private readonly semesterService: SemesterService,
    @Inject(forwardRef(() => LevelService))
    private readonly levelService: LevelService,
    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,
    @Inject(forwardRef(() => StudentService))
    private readonly studentService: StudentService,
  ) {}

  async findAll(findArgs: FindArchivesArgs): Promise<Archive[]> {
    const query = this.archiveRepository.createQueryBuilder('archive');
    query.where('archive.projectId = :projectId', {
      projectId: findArgs.projectId,
    });
    if (findArgs.sortBy) {
      query.orderBy('archive.name', findArgs.sortBy);
    }

    return await query.getMany();
  }

  async findOne(findArgs: FindArchiveArgs): Promise<Archive> {
    const query = this.archiveRepository.createQueryBuilder('archive');
    query.where('archive.projectId = :projectId', {
      projectId: findArgs.projectId,
    });
    query.andWhere('archive.id = :id', { id: findArgs.archiveId });

    query.leftJoinAndSelect('archive.levels', 'level');
    query.leftJoinAndSelect('level.divisions', 'division');
    query.leftJoinAndSelect('division.employees', 'employee');
    query.leftJoinAndSelect('division.students', 'student');
    query.leftJoinAndSelect('archive.semesters', 'semester');
    query.leftJoinAndSelect('level.subjects', 'subjects');
    return await query.getOne();
  }

  async create(input: ArchiveInput): Promise<Archive> {
    const findArchive = await this.archiveRepository.findOne({
      where: { projectId: input.projectId, name: input.name },
    });
    if (findArchive) {
      throw new BadRequestException('Archive already exists');
    }

    const archive = await this.archiveRepository.save(input);

    // for (const s of semesters) {
    //   await this.semesterService.create({
    //     name: s,
    //     archiveId: archive.id,
    //   });
    // }
    return archive;
  }

  async findById(id: string): Promise<Archive> {
    return await this.archiveRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.archiveRepository.delete(id);
  }

  async openNewArchive(input: OpenNewArchive) {
    // const newArchive = await this.create(input);
    // find all levels and add the new archive to them
    // await this.levelService.addNewArchiveIdToLevel(
    //   newArchive.id,
    //   input.currentArchiveId,
    // );
    // // find all employees and add the new archive to them
    // await this.employeeService.addNewArchiveToAllEmployees(
    //   newArchive.id,
    //   input.currentArchiveId,
    // );
    // // find all students and add the new archive to them

    // return newArchive;

    await this.studentService.AddNewArchiveIdAndLevelId(
      "d761486a-b6c2-435a-8897-8c9f4201c079")
  }
}
