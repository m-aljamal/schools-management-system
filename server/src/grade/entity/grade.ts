import { Semester } from './../../semester/entity/semester';
import { Student } from 'src/student/entity/student';
import { Field, ObjectType } from '@nestjs/graphql';
import { Exam } from 'src/exam/entity/exam';
import { Subject } from 'src/subject/entity/subject';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Grade {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Subject, (subject) => subject.grades)
  @Field(() => Subject)
  subject: Subject;

  @Field()
  @Column()
  subjectId: string;

  @ManyToOne(() => Exam, (exam) => exam.grades)
  @Field(() => Exam)
  exam: Exam;

  @Field()
  @Column()
  examId: string;

  @ManyToOne(() => Student, (student) => student.grades)
  @Field(() => Student)
  student: Student;

  @Field()
  @Column()
  studentId: string;

  @ManyToOne(() => Semester, (semester) => semester.grades)
  @Field(() => Semester)
  semester: Semester;

  @Field()
  @Column()
  semesterId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  final_grade: number;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  first_quiz_grade: number;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  second_quiz_grade: number;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  oral_grade: number;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  homework_grade: number;

  @Field({ defaultValue: false })
  @Column({ default: false })
  passTheExam: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  passAllExams: boolean;
}
