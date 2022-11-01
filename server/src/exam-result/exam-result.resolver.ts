import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExamResultInput } from './dto/exam-result.input';
import { ExamResult } from './entity/exam-result';
import { ExamResultService } from './exam-result.service';

@Resolver(() => ExamResult)
export class ExamResultResolver {
  constructor(private readonly examResultService: ExamResultService) {}

  @Mutation(() => ExamResult, { name: 'createExamResult' })
  async createExamResult(
    @Args('input') input: ExamResultInput,
  ): Promise<ExamResult> {
    return await this.examResultService.create(input);
  }

  @Query(() => ExamResult, { name: 'findStudentExamResult' })
  async findExamResult(
    @Args('studentId') studentId: string,
  ): Promise<ExamResult> {
    return await this.examResultService.findStudentExamResult(studentId);
  }
}
