import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentInput } from './dto/student.input';
import { Student } from './entity/student';
import { StudentService } from './student.service';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => [Student], { name: 'findStudents' })
  async findAll() {
    return this.studentService.findAll();
  }

  @Mutation(() => Student, { name: 'createStudent' })
  async create(@Args('input') input: StudentInput) {
    return this.studentService.create(input);
  }
}
