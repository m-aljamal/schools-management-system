import { ExamResult } from './../../exam-result/entity/exam-result';
import { Student } from 'src/student/entity/student';
import { Archive } from 'src/archive/entity/archive';
import { Level } from 'src/level/entity/level';
import { Semester } from 'src/semester/entity/semester';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Grade } from 'src/grade/entity/grade';

@ObjectType()
@Entity()
export class Exam {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // start date, end date, notes

  @ManyToOne(() => Semester, (semester) => semester.exams)
  @Field(() => Semester)
  semester: Semester;

  @Field()
  @Column()
  semesterId: string;

  @OneToMany(() => Grade, (grade) => grade.exam)
  @Field(() => [Grade], { nullable: true })
  grades: Grade[];

  @ManyToOne(() => Level, (level) => level.exams)
  @Field(() => Level)
  level: Level;

  @Field()
  @Column()
  levelId: string;

  @ManyToOne(() => Archive, (archive) => archive.exams)
  @Field(() => Archive)
  archive: Archive;

  @Field()
  @Column()
  archiveId: string;

  @OneToMany(() => ExamResult, (examResult) => examResult.exam)
  @Field(() => [ExamResult], { nullable: true })
  examResults: ExamResult[];
}
