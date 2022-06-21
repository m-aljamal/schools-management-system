import { Query } from './../../../client/src/generated/generates';
import { EmployeeInput } from './dto/employee.input';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entity/employee';
import { ArchiveService } from 'src/archive/archive.service';
import { LevelService } from 'src/level/level.service';
import { DivisionService } from 'src/division/division.service';
import { FindEmployeeArgs } from './dto/findEmployee.args';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    private readonly archiveService: ArchiveService,
    private readonly levelService: LevelService,
    private readonly divisionService: DivisionService,
  ) {}

  async find(args: FindEmployeeArgs) {
    const query = this.employeeRepo.createQueryBuilder('employee');
    if (args.excludeJobTitle) {
      query.andWhere('employee.jobTitle != :jobTitle', {
        jobTitle: args.excludeJobTitle,
      });
    }
    
    query.leftJoinAndSelect('employee.archives', 'archive');
    query.andWhere('archive.name = :archiveName', {
      archiveName: args.archiveName,
    });

    return await query.getMany();
  }

  async findOne(id: string) {

    const query = this.employeeRepo.createQueryBuilder('employee');
    query.leftJoinAndSelect('employee.archives', 'archive');
    query.leftJoinAndSelect('employee.levels', 'level');
    query.leftJoinAndSelect('employee.divisions', 'division');
    


    const employee = await this.employeeRepo.findOne({
      where: { id },
      relations: ['archives', 'levels', 'divisions'],
    });
    if (!employee) {
      throw new BadRequestException('Employee not found');
    }
    return employee;
  }

  async create(input: EmployeeInput) {
    const archives = await Promise.all(
      input.archives.map(async (id) => {
        const archive = await this.archiveService.findById(id);
        if (!archive) {
          throw new BadRequestException('الارشيف غير موجود');
        }
        return archive;
      }),
    );

    let levels = [];
    let divisions = [];
    if (input.jobTitle === 'TEACHER') {
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
            throw new BadRequestException('القسم غير موجود');
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
    });
    return this.employeeRepo.save(employee);
  }
}
