import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbsentArgs } from 'src/shared/absentArgs';
import {
  filterByApproved,
  filterByDate,
  filterByExactDate,
  filterByName,
} from 'src/shared/filtersAbsentFunctions';
import { Repository } from 'typeorm';
import { AbsentEmployeeInput } from './dto/absent-employee.input';
import { AbsentEmployee } from './entity/absent-employee';

@Injectable()
export class AbsentEmployeeService {
  constructor(
    @InjectRepository(AbsentEmployee)
    private readonly absentEmployeeRepository: Repository<AbsentEmployee>,
  ) {}

  async getAllAbsentEmployees(args: AbsentArgs): Promise<AbsentEmployee[]> {
    const query =
      this.absentEmployeeRepository.createQueryBuilder('absent_employee');
    query.leftJoinAndSelect('absent_employee.employee', 'employee');
    query.leftJoinAndSelect('absent_employee.archive', 'archive');
    query.leftJoinAndSelect('employee.levels', 'level');
    if (args.levelId) {
      query.andWhere('level.id = :levelId', { levelId: args.levelId });
    }
    query.andWhere('archive.id = :archiveId', { archiveId: args.archiveId });
    filterByExactDate({
      date: args.date,
      query,
      sqlTable: 'absent_employee',
    });
    filterByApproved({
      approved: args.approved,
      query,
      sqlTable: 'absent_employee',
    });
    filterByName({
      name: args.name,
      query: query,
      type: 'employee',
    });
    filterByDate({
      fromDate: args.fromDate,
      toDate: args.toDate,
      query,
      sqlTable: 'absent_employee',
    });
    return await query.getMany();
  }

  async getTotalAbsentEmployees(args: AbsentArgs) {
    const query =
      this.absentEmployeeRepository.createQueryBuilder('absent_employee');
    query.select(`employee.id`, 'id');
    query.addSelect(`employee.name`, 'name');
    query.addSelect('COUNT(*)', 'count');
    query.addSelect('absent_employee.approved', 'approved');
    query.innerJoin(`absent_employee.employee`, 'employee');
    query.groupBy(`employee.id`);
    query.addGroupBy('absent_employee.approved');
    query.leftJoinAndSelect('absent_employee.archive', 'archive');
    query.andWhere('archive.id = :archiveId', { archiveId: args.archiveId });
    query.addGroupBy('archive.id');
    filterByExactDate({
      date: args.date,
      query,
      sqlTable: 'absent_employee',
    });
    filterByApproved({
      approved: args.approved,
      query,
      sqlTable: 'absent_employee',
    });
    filterByName({
      name: args.name,
      query,
      type: 'employee',
    });
    filterByDate({
      fromDate: args.fromDate,
      toDate: args.toDate,
      query,
      sqlTable: 'absent_employee',
    });
    return await query.getRawMany();
  }

  async createAbsentEmployee(
    input: AbsentEmployeeInput,
  ): Promise<AbsentEmployee> {
    const absentEmployee = this.absentEmployeeRepository.create(input);
    return this.absentEmployeeRepository.save(absentEmployee);
  }
}
