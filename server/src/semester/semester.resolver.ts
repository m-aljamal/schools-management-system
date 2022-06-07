import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SemesterInput } from './dto/semester.input';
import { Semester } from './entity/semester';
import { SemesterService } from './semester.service';

@Resolver(() => Semester)
export class SemesterResolver {
  constructor(private readonly semesterService: SemesterService) {}

  @Query(() => [Semester], { name: 'findSemesters' })
  async findSemesters(): Promise<Semester[]> {
    return await this.semesterService.findAll();
  }

  @Mutation(() => Semester, { name: 'createSemester' })
  async createSemester(@Args('input') input: SemesterInput): Promise<Semester> {
    return await this.semesterService.create(input);
  }
}
