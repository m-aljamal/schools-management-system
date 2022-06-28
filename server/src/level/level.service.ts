import { ReturnData } from './../../utils/enum';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { ArchiveService } from 'src/archive/archive.service';
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
    private readonly archiveService: ArchiveService,
  ) {}

  async findAll(args: FindLevelArgs): Promise<Level[]> {
    const query = this.levelRepository.createQueryBuilder('level');
    query.where('archive.projectId = :projectId', {
      projectId: args.projectId,
    });
    query.andWhere('archive.name = :archiveName', {
      archiveName: args.archiveName,
    });
    query.leftJoinAndSelect('level.archive', 'archive');
    if (args.returnData === ReturnData.FULL) {
      query.leftJoinAndSelect('division.employees', 'employee');
      query.leftJoinAndSelect('division.students', 'student');
    }
    if (args.returnData === ReturnData.EMPLOYEE) {
      query.leftJoinAndSelect('division.employees', 'employee');
    }
    if (args.returnData === ReturnData.STUDENT) {
      query.leftJoinAndSelect('division.students', 'student');
    }
    if (args.returnData === ReturnData.LEVELS) {
      query.leftJoinAndSelect('level.divisions', 'division');
    }

    return await query.getMany();
  }

  async create(levelInput: LevelInput): Promise<Level> {
    const findLevel = await this.levelRepository.findOne({
      where: { name: levelInput.name, archiveId: levelInput.archiveId },
    });
    if (findLevel) {
      throw new BadRequestException('المستوى موجود مسبقا');
    }
    return await this.levelRepository.save(levelInput);
  }

  async findOne(id: string): Promise<Level> {
    return await this.levelRepository.findOne({
      where: { id },
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
}
