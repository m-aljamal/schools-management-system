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
    query.where('archive.name = :archiveName', {
      archiveName: args.archiveName,
    });
    query.leftJoinAndSelect('level.divisions', 'division');
    if (args.find === 'EMPLOYEES') {
      query.leftJoinAndSelect('division.employees', 'employee');
    }

    if (args.find === 'STUDENTS') {
      query.leftJoinAndSelect('division.students', 'student');
    }
    if (args.find === 'ALL') {
      query.leftJoinAndSelect('division.employees', 'employee');
      query.leftJoinAndSelect('division.students', 'student');
    }

    query.leftJoinAndSelect('level.archive', 'archive');
    return await query.getMany();
  }

  async create(levelInput: LevelInput): Promise<Level> {
    // const archives = await Promise.all(
    //   levelInput.archives.map(async (id) => {
    //     const archive = await this.archiveService.findOne(id);
    //     if (!archive) {
    //       throw new BadRequestException('الارشيف غير موجود');
    //     }
    //     return archive;
    //   }),
    // );
    // const level = this.levelRepository.create({
    //   ...levelInput,
    // });
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
