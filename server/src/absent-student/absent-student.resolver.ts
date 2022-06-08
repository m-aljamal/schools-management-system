import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AbsentStudentService } from './absent-student.service';
import { AbsentStudentInput } from './dto/absent-student.input';
import { AbsentStudent } from './entity/absent-student';

@Resolver(() => AbsentStudent)
export class AbsentStudentResolver {
  constructor(private readonly absentStudentService: AbsentStudentService) {}

  @Query(() => [AbsentStudent], { name: 'absentStudents' })
  async findAbsentStudents(): Promise<AbsentStudent[]> {
    return this.absentStudentService.findAll();
  }

  @Mutation(() => AbsentStudent, { name: 'createAbsentStudent' })
  async createAbsentStudent(
    @Args('input') input: AbsentStudentInput,
  )  {
    return this.absentStudentService.createAbsentStudent(input);
  }
}
