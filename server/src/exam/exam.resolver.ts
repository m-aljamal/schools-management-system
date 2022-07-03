import { Level } from 'src/level/entity/level';
import { ExamInput } from './dto/exam.input';
import { Exam } from './entity/exam';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ExamService } from './exam.service';
import { LevelService } from 'src/level/level.service';

@Resolver(() => Exam)
export class ExamResolver {
  constructor(
    private readonly examService: ExamService,
    private readonly levelService: LevelService,
  ) {}

  @Query(() => [Exam], { name: 'findExams' })
  async findExams(): Promise<Exam[]> {
    return await this.examService.find();
  }

  @Mutation(() => Exam, { name: 'createExam' })
  async createExam(@Args('input') input: ExamInput): Promise<Exam> {
    return await this.examService.create(input);
  }

  @ResolveField(() => Exam)
  async level(@Parent() exam: Exam): Promise<Level> {
    return await this.levelService.findOne(exam.levelId);
  }
}
