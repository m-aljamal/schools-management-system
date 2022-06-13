import { EmployeeInput } from './dto/employee.input';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entity/employee';
import { ArchiveService } from 'src/archive/archive.service';
import { LevelService } from 'src/level/level.service';
import { DivisionService } from 'src/division/division.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    private readonly archiveService: ArchiveService,
    private readonly levelService: LevelService,
    private readonly divisionService: DivisionService,
  ) {}

  async find() {
    return await this.employeeRepo.find({
      relations: ['archives'],
    });
  }

  async create(input: EmployeeInput) {
    // const archives = await Promise.all(
    //   input.archives.map(async (id) => {
    //     const archive = await this.loadArchives(id);
    //     if (!archive) {
    //       throw new BadRequestException('الارشيف غير موجود');
    //     }
    //     return archive;
    //   }),
    // );
    // check if the employee is teacher
    const levels = await Promise.all(
      input.levels.map(async (id) => {
        const level = await this.levelService.findOne(id);
        if (!level) {
          throw new BadRequestException('المرحلة غير موجودة');
        }
        return level;
      }),
    );
    const divisions = await Promise.all(
      input.divisions.map(async (id) => {
        const division = await this.divisionService.findOne(id);
        if (!division) {
          throw new BadRequestException('القسم غير موجود');
        }
        return division;
      }),
    );

    const employee = this.employeeRepo.create({
      ...input,
      // archives,
      divisions,
      levels,
    });
    return this.employeeRepo.save(employee);
  }

  private async loadArchives(id: string) {
    return await this.archiveService.findOne(id);
  }
}
