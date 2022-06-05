import { InjectRepository } from '@nestjs/typeorm';
import { Division } from './entity/division';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DivisionInput } from './dto/division.input';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private readonly divisionRepository: Repository<Division>,
  ) {}

  async findAll(): Promise<Division[]> {
    return this.divisionRepository.find();
  }

  async create(divisionInput: DivisionInput): Promise<Division> {
    return await this.divisionRepository.save(divisionInput);
  }
}
