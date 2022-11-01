import { Field, ObjectType } from '@nestjs/graphql';
import { Exam } from 'src/exam/entity/exam';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class StudentPassLevel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Exam, (exam) => exam.studentPassLevel)
  @Field(() => Exam)
  exam: Exam;
}
