import { Student } from 'src/student/entity/student';
import { Field, ObjectType } from '@nestjs/graphql';
import { Exam } from 'src/exam/entity/exam';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ExamResult {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Exam, (exam) => exam.examResults)
  @Field(() => Exam)
  exam: Exam;

  @Field()
  @Column()
  examId: string;

  @ManyToOne(() => Student, (student) => student.examResults)
  @Field(() => Student)
  student: Student;

  @Field()
  @Column()
  studentId: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  passTheExam: boolean;
}
