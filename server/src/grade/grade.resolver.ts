import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Student } from 'src/student/entity/student';
import { StudentService } from 'src/student/student.service';
import { GradeInput } from './dto/grade.input';
import { Grade } from './entity/grade';
import { GradeService } from './grade.service';

@Resolver(() => Grade)
export class GradeResolver {
  constructor(
    private readonly gradeService: GradeService,
    private readonly studentService: StudentService,
  ) {}

  @Query(() => [Grade], { name: 'findGrades' })
  async grades() {
    return this.gradeService.findAll();
  }

  @Mutation(() => Grade, { name: 'createGrade' })
  async createGrade(@Args('input') input: GradeInput) {
    return this.gradeService.createGrade(input);
  }
  @ResolveField(() => Grade)
  async student(@Parent() grade: Grade): Promise<Student> {
    return this.studentService.findOne(grade.studentId);
  }
}
