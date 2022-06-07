import { InjectRepository } from '@nestjs/typeorm';
import { Division } from './entity/division';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DivisionInput } from './dto/division.input';
import { ArchiveService } from 'src/archive/archive.service';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private readonly divisionRepository: Repository<Division>,
    private readonly archiveService: ArchiveService,
  ) {}

  async findAll(): Promise<Division[]> {
    return this.divisionRepository.find({
      relations: ['students', 'archives'],
    });
  }

  async create(divisionInput: DivisionInput): Promise<Division> {
    const archives = await Promise.all(
      divisionInput.archives.map(async (id) => {
        const archive = await this.archiveService.findOne(id);
        if (!archive) {
          throw new BadRequestException('الارشيف غير موجود');
        }
        return archive;
      }),
    );
    const division = this.divisionRepository.create({
      ...divisionInput,
      archives,
    });
    return await this.divisionRepository.save(division);
  }
}
