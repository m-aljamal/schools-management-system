import { InjectRepository } from '@nestjs/typeorm';
import { Division } from './entity/division';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { DivisionInput } from './dto/division.input';
import { DivisionUpdateInput } from './dto/division.update';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(Division)
    private readonly divisionRepository: Repository<Division>,
  ) {}

  async findAll(levelId: string): Promise<Division[]> {
    // return this.divisionRepository.find({
    //   where: { levelId },
    //   relations: ['students'],
    // });
    const query = await this.divisionRepository.createQueryBuilder('division');
    query.where('division.levelId = :levelId', { levelId });
    query.innerJoinAndSelect('division.students', 'student');
    return query.getMany();
  }

  async create(divisionInput: DivisionInput): Promise<Division> {
    return await this.divisionRepository.save(divisionInput);
  }

  async findOne(id: string): Promise<Division> {
    return await this.divisionRepository.findOne({
      where: { id },
      relations: ['students'],
    });
  }

  async update(id: string, divisionUpdateInput: DivisionUpdateInput) {
    //   let division = await this.divisionRepository.findOne({
    //     where: { id },
    //   });
    //   if (!division) {
    //     throw new NotFoundException('القسم غير موجود');
    //   }
    //   let newArchives = [];
    //   if (divisionUpdateInput.archives) {
    //     newArchives = await Promise.all(
    //       divisionUpdateInput.archives.map(async (id) => {
    //         const archive = await this.archiveService.findOne(id);
    //         if (!archive) {
    //           throw new BadRequestException('الارشيف غير موجود');
    //         }
    //         return archive;
    //       }),
    //     );
    //   }
    //   const archives = [...division.archives, ...newArchives];
    //   divisionUpdateInput.archives = archives;
    //   Object.assign(division, divisionUpdateInput);
    //   console.log(division);
    // }
  }
}
