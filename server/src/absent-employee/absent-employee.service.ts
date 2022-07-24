import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbsentArgs } from 'src/shared/absentArgs';
import { AbsentEmployee } from 'src/shared/AbsentEntity';
import {
  findAllAbsent,
  findTotalAbsent,
} from 'src/shared/filtersAbsentFunctions';
import { Repository } from 'typeorm';
import { AbsentEmployeeInput } from './dto/absent-employee.input';

@Injectable()
export class AbsentEmployeeService {
  constructor(
    @InjectRepository(AbsentEmployee)
    private readonly absentEmployeeRepository: Repository<AbsentEmployee>,
  ) {}

  async getAllAbsentEmployees(args: AbsentArgs): Promise<AbsentEmployee[]> {
    const query =
      this.absentEmployeeRepository.createQueryBuilder('absent_employee');

    findAllAbsent({
      query,
      args,
      sqlTable: 'absent_employee',
      type: 'employee',
    });
    return await query.getMany();
  }

  async getTotalAbsentEmployees(args: AbsentArgs) {
    const query =
      this.absentEmployeeRepository.createQueryBuilder('absent_employee');

    findTotalAbsent({
      args,
      query,
      sqlTable: 'absent_employee',
      type: 'employee',
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
