import { LevelService } from './../level/level.service';
import { Archive } from './entity/archive';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArchiveInput, OpenNewArchive } from './dto/archive.input';
import { FindArchiveArgs, FindArchivesArgs } from './dto/findArchive.args';
import { SemesterService } from 'src/semester/semester.service';
import { semesters } from 'utils/constant';
import { DivisionService } from 'src/division/division.service';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class ArchiveService {
  constructor(
    @InjectRepository(Archive)
    private readonly archiveRepository: Repository<Archive>,
    // private readonly employeeService: EmployeeService,
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

  async openNewArchive(input: OpenNewArchive) {
    // const newArchive = await this.create(input);

    // find all employees and add the new archive to them
    // const employees = await this.employeeService.findAllByArchive(
    //   input.currentArchiveId,
    // );
    // console.log(employees);
    
    // update project current archive to the new archive
    // return newArchive
    // find all students passed from exam and add the new levels and divisions to them
    // find last subjects and create new them to new archive
  }
}
