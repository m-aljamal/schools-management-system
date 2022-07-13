import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { findLevels } from 'src/queries/levels.query';
import { Repository } from 'typeorm';
import { FindLevelArgs } from './dto/FindLevel.args';
import { LevelInput } from './dto/level.input';
import { LevelUpdateInput } from './dto/level.update';
import { Level } from './entity/level';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) {}

  async create(levelInput: LevelInput): Promise<Level> {
    const findLevel = await this.levelRepository.findOne({
      where: { name: levelInput.name, archiveId: levelInput.archiveId },
    });
    if (findLevel) {
      throw new BadRequestException('المستوى موجود مسبقا');
    }
    return await this.levelRepository.save(levelInput);
  }

  // new

  async findLevels(archiveId: string): Promise<Level[]> {
    return await this.levelRepository.find({
      where: { archiveId },
    });
  }
  // end new

  async findOne(id: string): Promise<Level> {
    return await this.levelRepository.findOne({
      where: { id },
      relations: ['students'],
    });
  }

  async update(id: string, levelInput: LevelUpdateInput) {
    const level = await this.levelRepository.findOne({
      where: { id },
    });
    if (!level) {
      throw new NotFoundException('المستوى غير موجود');
    }
  }

  async find_levels_divisions(args: FindLevelArgs): Promise<Level[]> {
    const query = this.levelRepository.createQueryBuilder('level');

    findLevels(args, query);

    return await query.getMany();
  }

  async find_levels_divisions_students(args: FindLevelArgs): Promise<Level[]> {
    const query = this.levelRepository.createQueryBuilder('level');

    findLevels(args, query);
    query.leftJoinAndSelect('division.students', 'student');
    return await query.getMany();
  }
  async find_levels_divisions_employees(args: FindLevelArgs): Promise<Level[]> {
    const query = this.levelRepository.createQueryBuilder('level');

    findLevels(args, query);
    query.innerJoinAndSelect('division.employees', 'employee');
    return await query.getMany();
  }

  async find_levels_divisions_employees_students(
    args: FindLevelArgs,
  ): Promise<Level[]> {
    const query = this.levelRepository.createQueryBuilder('level');

    findLevels(args, query);

    query.leftJoinAndSelect('division.employees', 'employee');
    query.leftJoinAndSelect('division.students', 'student');

    return await query.getMany();
  }
}
