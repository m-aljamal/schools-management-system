import { FindStudentsArgs, FindStudentArgs } from './dto/findStudents.args';
import { Division } from './../division/entity/division';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DivisionService } from 'src/division/division.service';
import { StudentInput } from './dto/student.input';
import { Student } from './entity/student';
import { StudentService } from './student.service';

@Resolver(() => Student)
export class StudentResolver {
  constructor(
    private readonly studentService: StudentService,
    private readonly divisionService: DivisionService,
  ) {}

  @Query(() => [Student], { name: 'findStudents' })
  async findAll(@Args() args: FindStudentsArgs) {
    return this.studentService.findAll(args);
  }

  @Query(() => Student, { name: 'findStudent' })
  async findStudent(@Args() args: FindStudentArgs) {
    return this.studentService.findStudent(args);
  }
  @Mutation(() => Student, { name: 'createStudent' })
  async create(@Args('input') input: StudentInput) {
    return this.studentService.create(input);
  }

  // @ResolveField(() => Student)
  // async division(@Parent() student: Student): Promise<Division> {
  //   return this.divisionService.findOne(student.divisionId);
  // }
}
