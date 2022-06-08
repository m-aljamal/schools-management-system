import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbsentEmployeeInput } from './dto/absent-employee.input';
import { AbsentEmployee } from './entity/absent-employee';

@Injectable()
export class AbsentEmployeeService {
  constructor(
    @InjectRepository(AbsentEmployee)
    private readonly absentEmployeeRepository: Repository<AbsentEmployee>,
  ) {}

  async findAll(): Promise<AbsentEmployee[]> {
    return this.absentEmployeeRepository.find({
      relations: ['employee', 'semester'],
    });
  }

  async createAbsentEmployee(
    input: AbsentEmployeeInput,
  ): Promise<AbsentEmployee> {
    const absentEmployee = this.absentEmployeeRepository.create(input);
    return this.absentEmployeeRepository.save(absentEmployee);
  }
}
