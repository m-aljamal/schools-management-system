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

@Injectable()
export class ArchiveService {
  constructor(
    @InjectRepository(Archive)
    private readonly archiveRepository: Repository<Archive>,
    private readonly semesterService: SemesterService,
    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: EmployeeService,
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
    // const previousLevels = await this.levelService.findAll(
    //   input.currentArchiveId,
    // );
    // for (const level of previousLevels) {
    //   const newLevel = await this.levelService.create({
    //     name: level.name,
    //     archiveId: newArchive.id,
    //   });
    //   for (const division of level.divisions) {
    //     await this.divisionSerive.create({
    //       name: division.name,
    //       levelId: newLevel.id,
    //     });
    //   }
    // }
    // // update project current archive to the new archive
    // return newArchive;
    // find all divisions and create new
    // find all employees and add the new archive to them
    // find all students passed from exam and add the new levels and divisions to them
    // find last subjects and create new them to new archive
  }
}
