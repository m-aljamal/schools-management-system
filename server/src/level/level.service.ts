import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { ArchiveService } from 'src/archive/archive.service';
import { Repository } from 'typeorm';
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

  async findAll(): Promise<Level[]> {
    const query = this.levelRepository.createQueryBuilder('level');
    query.leftJoinAndSelect('level.divisions', 'division');
    query.leftJoinAndSelect('division.employees', 'employee');
    query.leftJoinAndSelect('division.students', 'student');
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
