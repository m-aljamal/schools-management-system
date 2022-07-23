import { AbsentArgs } from './../shared/absentArgs';
import { Role } from 'utils/enum';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindLevelArgs } from './dto/FindLevel.args';
import { LevelInput } from './dto/level.input';
import { LevelUpdateInput } from './dto/level.update';
import { Level } from './entity/level';
import { filterByExactDate } from 'src/shared/filtersAbsentFunctions';

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

  async findLevels(archiveId: string): Promise<Level[]> {
    return await this.levelRepository.find({
      where: { archiveId },
    });
  }

  async findTechers_levels(archiveId: string): Promise<Level[]> {
    const query = this.levelRepository.createQueryBuilder('level');
    query.leftJoinAndSelect('level.archive', 'archive');

    query.andWhere('archive.id = :archiveId', {
      archiveId,
    });
    query.leftJoinAndSelect('level.divisions', 'division');
    query.innerJoinAndSelect('division.employees', 'employee');
    query.andWhere('employee.role = :role', {
      role: Role.TEACHER,
    });
    return await query.getMany();
  }

  async findStudents_levels(archiveId: string): Promise<Level[]> {
    const query = this.levelRepository.createQueryBuilder('level');
    query.leftJoinAndSelect('level.archive', 'archive');

    query.andWhere('archive.id = :archiveId', {
      archiveId,
    });
    query.leftJoinAndSelect('level.divisions', 'division');
    query.innerJoinAndSelect('division.students', 'students');

    return await query.getMany();
  }

  async findOne(id: string): Promise<Level> {
    return await this.levelRepository.findOne({
      where: { id },
    });
  }

  async findAbsentStudents(args: AbsentArgs) {
    const query = this.levelRepository.createQueryBuilder('level');
    query.leftJoinAndSelect('level.archive', 'archive');

    query.andWhere('archive.id = :archiveId', {
      archiveId: args.archiveId,
    });
    query.leftJoinAndSelect('level.divisions', 'division');
    query.innerJoinAndSelect('division.students', 'students');
    query.innerJoinAndSelect('students.absentStudents', 'absentStudents');
    query.andWhere('absentStudents.id is not null');
    filterByExactDate({
      query,
      date: args.date,
      sqlTable: 'absentStudents',
    });
    return await query.getMany();
  }

  async update(id: string, levelInput: LevelUpdateInput) {
    const level = await this.levelRepository.findOne({
      where: { id },
    });
    if (!level) {
      throw new NotFoundException('المستوى غير موجود');
    }
  }
}
