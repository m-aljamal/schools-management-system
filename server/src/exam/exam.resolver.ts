import { ExamInput } from './dto/exam.input';
import { Exam } from './entity/exam';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExamService } from './exam.service';

@Resolver(() => Exam)
export class ExamResolver {
  constructor(private readonly examService: ExamService) {}

  @Query(() => [Exam], { name: 'findExams' })
  async findExams(): Promise<Exam[]> {
    return await this.examService.find();
  }

  @Mutation(() => Exam, { name: 'createExam' })
  async createExam(@Args('input') input: ExamInput): Promise<Exam> {
    return await this.examService.create(input);
  }
}
