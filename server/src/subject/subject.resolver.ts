import { FindSubject } from './dto/findSubject.args';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubjectInput } from './dto/subject.input';
import { Subject } from './entity/subject';
import { SubjectService } from './subject.service';

@Resolver(() => Subject)
export class SubjectResolver {
  constructor(private readonly subjectService: SubjectService) {}

  @Query(() => [Subject], { name: 'findSubjects' })
  async subjects(@Args("levelId") levelId: string): Promise<Subject[]> {
    return this.subjectService.findAll(levelId);
  }

  @Query(() => [Subject], { name: 'findSubjects_for_grades' })
  async findSubjects_for_grades(@Args() args: FindSubject): Promise<Subject[]> {
    return this.subjectService.findSubjects_for_grades(args);
  }

  @Mutation(() => Subject, { name: 'createSubject' })
  async createSubject(@Args('input') input: SubjectInput): Promise<Subject> {
    return this.subjectService.create(input);
  }
}
