import { Subject } from 'src/subject/entity/subject';
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
import { SubjectService } from 'src/subject/subject.service';

@Resolver(() => Grade)
export class GradeResolver {
  constructor(
    private readonly gradeService: GradeService,
    private readonly studentService: StudentService,
    private readonly subjectService: SubjectService,
  ) {}

  @Query(() => [Grade], { name: 'findGrades' })
  async grades() {
    return this.gradeService.findAll();
  }

  @Mutation(() => Grade, { name: 'createGrade' })
  async createGrade(@Args('input') input: GradeInput) {
    return this.gradeService.createGrade(input);
  }
  @Mutation(() => Grade, { name: 'seedGrade' })
  async seedGrade(@Args('input') input: GradeInput) {
    return this.gradeService.seedGrade(input);
  }
  @ResolveField(() => Grade)
  async student(@Parent() grade: Grade): Promise<Student> {
    return this.studentService.findOne(grade.studentId);
  }

  @ResolveField(() => Grade)
  async subject(@Parent() grade: Grade): Promise<Subject> {
    return this.subjectService.findOne(grade.subjectId);
  }
}
