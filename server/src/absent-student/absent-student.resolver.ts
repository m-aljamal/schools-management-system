import { AbsentArgs } from './../shared/absentArgs';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AbsentStudent } from 'src/shared/AbsentEntity';
import { AbsentStudentService } from './absent-student.service';
import { AbsentStudentInput } from './dto/absent-student.input';
import { TotalAbsent } from 'src/shared/totalAbsent';

@Resolver(() => AbsentStudent)
export class AbsentStudentResolver {
  constructor(private readonly absentStudentService: AbsentStudentService) {}

  @Query(() => [AbsentStudent], { name: 'findAbsentStudents' })
  async findAbsentStudents(@Args() args: AbsentArgs): Promise<AbsentStudent[]> {
    return this.absentStudentService.findAll(args);
  }

  @Query(() => [TotalAbsent], { name: 'findTotalAbsentStudents' })
  async getTotalEmpabsent(@Args() args: AbsentArgs) {
    return await this.absentStudentService.getTotalAbsentStudents(args);
  }

  @Mutation(() => AbsentStudent, { name: 'createAbsentStudent' })
  async createAbsentStudent(@Args('input') input: AbsentStudentInput) {
    return this.absentStudentService.createAbsentStudent(input);
  }
}
