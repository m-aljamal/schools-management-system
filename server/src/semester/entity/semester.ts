import { Field, ObjectType } from '@nestjs/graphql';
import { Archive } from 'src/archive/entity/archive';
import { Exam } from 'src/exam/entity/exam';
import { AbsentEmployee, AbsentStudent } from 'src/shared/AbsentEntity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Grade } from 'src/grade/entity/grade';
import { Level } from 'src/level/entity/level';

@ObjectType()
@Entity()
export class Semester {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @ManyToOne(() => Archive, (archive) => archive.semesters)
  @Field(() => Archive)
  archive: Archive;

  @Field()
  @Column()
  archiveId: string;

  @OneToMany(() => AbsentStudent, (absentStudent) => absentStudent.semester)
  @Field(() => [AbsentStudent])
  absentStudents: AbsentStudent[];

  @OneToMany(() => AbsentEmployee, (absentEmployee) => absentEmployee.semester)
  @Field(() => [AbsentEmployee])
  absentEmployees: AbsentEmployee[];

  @OneToMany(() => Exam, (exam) => exam.semester)
  @Field(() => [Exam])
  exams: Exam[];

  @OneToMany(() => Grade, (grade) => grade.semester)
  @Field(() => [Grade])
  grades: Grade[];
}
