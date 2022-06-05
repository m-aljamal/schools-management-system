import { Injectable } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LevelInput } from './dto/level.input';
import { Level } from './entity/level';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}

  async findAll(): Promise<Level[]> {
    return this.levelRepository.find({
      relations: ['divisions'],
    });
  }

  async create(levelInput: LevelInput): Promise<Level> {
    return await this.levelRepository.save(levelInput);
  }
}
