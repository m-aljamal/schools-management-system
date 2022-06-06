import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TeacherInput } from './dto/teacher.input';
import { Teacher } from './entity/teacher';
import { TeacherService } from './teacher.service';

@Resolver(() => Teacher)
export class TeacherResolver {
  constructor(private readonly teacherService: TeacherService) {}

  @Query(() => [Teacher], { name: 'findTeachers' })
  async findAll() {
    return this.teacherService.find();
  }

  @Mutation(() => Teacher, { name: 'createTeacher' })
  async create(@Args('input') input: TeacherInput) {
    return this.teacherService.create(input);
  }
}
