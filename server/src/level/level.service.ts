import { AbsentArgs } from './../shared/absentArgs';
import { Role } from 'utils/enum';
import {
  BadRequestException,
  forwardRef,
  Inject,
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
import { ArchiveService } from 'src/archive/archive.service';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
    @Inject(forwardRef(() => ArchiveService))
    private readonly archiveService: ArchiveService,
  ) {}

  async create(levelInput: LevelInput): Promise<Level> {
    // const findLevel = await this.levelRepository.findOne({
    //   where: { name: levelInput.name, archiveId: levelInput.archiveId },
    // });
    // if (findLevel) {
    //   throw new BadRequestException('المستوى موجود مسبقا');
    // }

    const archives = await Promise.all(
      levelInput.archives.map(async (id) => {
        const archive = await this.archiveService.findById(id);
        if (!archive) {
          throw new BadRequestException('الأرشيف غير موجود');
        }
        return archive;
      }),
    );
    const level = this.levelRepository.create({
      ...levelInput,
      archives,
    });
    return await this.levelRepository.save(level);
  }

  async findSubjects(archiveId: string): Promise<Level[]> {
    const query = this.levelRepository.createQueryBuilder('level');
    query.leftJoinAndSelect('level.archive', 'archive');
    query.andWhere('archive.id = :archiveId', {
      archiveId,
    });
    query.innerJoinAndSelect('level.subjects', 'subjects');
    return await query.getMany();
  }

  async findLevels(archiveId: string): Promise<Level[]> {
    const query = this.levelRepository.createQueryBuilder('level');
    query.leftJoinAndSelect('level.archives', 'archive');
    query.leftJoinAndSelect('level.divisions', 'division');
    query.andWhere('archive.id = :archiveId', {
      archiveId,
    });
    return await query.getMany();
  }

  async findTechers_levels(archiveId: string): Promise<Level[]> {
    const query = this.levelRepository.createQueryBuilder('level');
    query.leftJoinAndSelect('level.archives', 'archives');

    query.andWhere('archives.id = :archiveId', {
      archiveId,
    });
    query.leftJoinAndSelect('level.divisions', 'division');
    query.innerJoinAndSelect('division.employees', 'employee');
    query.innerJoinAndSelect('employee.archives', 'archive');
    query.andWhere('archive.id = :archiveId', {
      archiveId,
    });
    query.andWhere('employee.role = :role', {
      role: Role.TEACHER,
    });
    return await query.getMany();
  }

  async findStudents_levels(archiveId: string): Promise<Level[]> {
    const query = this.levelRepository.createQueryBuilder('level');
    query.leftJoinAndSelect('level.divisions', 'division');
    query.innerJoinAndSelect('division.students', 'students');
    query.leftJoinAndSelect('students.archives', 'archives');
    query.andWhere('archives.id = :archiveId', {
      archiveId,
    });

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

  async addNewArchiveIdToLevel(archiveId: string, currentArchiveId: string) {
    const levelsQuery = this.levelRepository
      .createQueryBuilder('level')
      .leftJoinAndSelect('level.archives', 'archive')
      .where('archive.id = :archiveId', { archiveId: currentArchiveId });

    const levels = await levelsQuery.getMany();

    const archive = await this.archiveService.findById(archiveId);

    for (let level of levels) {
      level.archives = [...level.archives, archive];
      await this.levelRepository.save(level);
    }
    return levels;
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
