import { EmployeeInput } from './dto/employee.input';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entity/employee';
import { ArchiveService } from 'src/archive/archive.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    private readonly archiveService: ArchiveService,
  ) {}

  async find() {
    return await this.employeeRepo.find({
      relations: ['archives'],
    });
  }

  async create(input: EmployeeInput) {
    const archives = await Promise.all(
      input.archives.map(async (id) => {
        const archive = await this.loadArchives(id);
        if (!archive) {
          throw new BadRequestException('الارشيف غير موجود');
        }
        return archive;
      }),
    );
    const employee = this.employeeRepo.create({
      ...input,
      archives,
    });
    return this.employeeRepo.save(employee);
  }

  private async loadArchives(id: string) {
    return await this.archiveService.findOne(id);
  }
}
