import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { ArchiveService } from 'src/archive/archive.service';
import { Repository } from 'typeorm';
import { LevelInput } from './dto/level.input';
import { Level } from './entity/level';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
    private readonly archiveService: ArchiveService,
  ) {}

  async findAll(): Promise<Level[]> {
    return this.levelRepository.find({
      relations: ['divisions', 'students', 'archives'],
    });
  }

  async create(levelInput: LevelInput): Promise<Level> {
    const archives = await Promise.all(
      levelInput.archives.map(async (id) => {
        const archive = await this.archiveService.findOne(id);
        if (!archive) {
          throw new BadRequestException('الارشيف غير موجود');
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
}
