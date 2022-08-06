import { hashPassword } from './../../utils/hashPassword';
import { EmployeeInput } from './dto/employee.input';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Employee } from './entity/employee';
import { ArchiveService } from 'src/archive/archive.service';
import { LevelService } from 'src/level/level.service';
import { DivisionService } from 'src/division/division.service';
import { FindEmployeesArgs, FindEmployeeArgs } from './dto/findEmployee.args';
import { Role } from 'utils/enum';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    private readonly levelService: LevelService,
    private readonly divisionService: DivisionService,
    @Inject(forwardRef(() => ArchiveService))
    private readonly archiveService: ArchiveService,
  ) {}

  async findManagers(args: FindEmployeesArgs) {
    const query = this.employeeRepo.createQueryBuilder('employee');
    // todo: employee position order to make the mangers at top and the rest at bottom
    query.where('employee.role NOT IN (:...roles)', {
      roles: [Role.ADMIN, Role.TEACHER],
    });

    query.leftJoinAndSelect('employee.archives', 'archives');
    query.andWhere('archives.id = :archiveId', {
      archiveId: args.archiveId,
    });

    return await query.getMany();
  }

  async findTeachers(args: FindEmployeesArgs) {
    const query = this.employeeRepo.createQueryBuilder('employee');
    query.where('employee.role = :role', { role: Role.TEACHER });
    query.leftJoinAndSelect('employee.levels', 'level');
    query.leftJoinAndSelect('employee.divisions', 'division');

    if (args.levelId) {
      query.andWhere('division.level.id = :levelId', { levelId: args.levelId });
    }
    return await query.getMany();
  }

  async findOne(args: FindEmployeeArgs) {
    const employee = await this.employeeRepo.findOne({
      where: { id: args.id },
    });

    const query = this.employeeRepo.createQueryBuilder('employee');
    query.where('employee.id = :id', { id: args.id });
    if (employee.role === Role.TEACHER) {
      query.leftJoinAndSelect('employee.levels', 'levels');

      query.andWhere('levels.archiveId = :archiveId', {
        archiveId: args.archiveId,
      });
      if (args.levelId) {
        query.andWhere('levels.id = :levelId', { levelId: args.levelId });
      }
      query.leftJoinAndSelect('employee.divisions', 'division');
      query.leftJoinAndSelect('levels.divisions', 'divisions');
      query.leftJoinAndSelect('employee.archives', 'archives');
      query.andWhere('divisions.id IN (division.id)');
      query.andWhere('archives.id = :archiveId', { archiveId: args.archiveId });
    }
    return await query.getOne();
  }

  async create(input: EmployeeInput) {
    if (input.role !== Role.ADMIN && input.projectId === undefined)
      return new BadRequestException('projectId should be provided');

    let archives = [];
    if (input.role !== Role.ADMIN) {
      archives = await Promise.all(
        input.archives.map(async (id) => {
          const archive = await this.archiveService.findById(id);
          if (!archive) {
            throw new BadRequestException('الارشيف غير موجود');
          }
          return archive;
        }),
      );
    }
    let levels = [];
    let divisions = [];
    if (input.role === Role.TEACHER) {
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
    }

    const employee = this.employeeRepo.create({
      ...input,
      archives,
      divisions,
      levels,
      password: hashPassword(input.password),
    });

    return this.employeeRepo.save(employee);
  }

  async findByUsername(username: string): Promise<Employee> {
    return await this.employeeRepo.findOne({
      where: { username },
      relations: ['archives'],
    });
  }

  async addNewEmployeeArchive(employeeId: string, archiveId: string) {
    const employee = await this.employeeRepo.findOne({
      where: { id: employeeId },
    });
    if (!employee) {
      throw new BadRequestException('الموظف غير موجود');
    }
    const archive = await this.archiveService.findById(archiveId);
    if (!archive) {
      throw new BadRequestException('الارشيف غير موجود');
    }
    employee.archives.push(archive);
    return this.employeeRepo.save(employee);
  }
}
