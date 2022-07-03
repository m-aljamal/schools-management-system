import { Field, ObjectType } from '@nestjs/graphql';
import { Archive } from 'src/archive/entity/archive';
import { Division } from 'src/division/entity/division';
import { Employee } from 'src/employee/entity/employee';
import { Exam } from 'src/exam/entity/exam';
import { Student } from 'src/student/entity/student';
import { Subject } from 'src/subject/entity/subject';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Level {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => Division, (division) => division.level)
  @Field(() => [Division], { nullable: true })
  divisions: Division[];

  @OneToMany(() => Student, (student) => student.level)
  @Field(() => [Student], { nullable: true })
  students: Student[];

  @ManyToMany(() => Employee, (employee) => employee.levels)
  @Field(() => [Student], { nullable: true })
  employees: Employee[];

  @ManyToOne(() => Archive, (archive) => archive.levels)
  @Field(() => Archive)
  archive: Archive;

  @Field()
  @Column()
  archiveId: string;

  @OneToMany(() => Exam, (exam) => exam.level)
  @Field(() => [Exam])
  exams: Exam[];

  @OneToMany(() => Subject, (subject) => subject.level)
  @Field(() => [Subject])
  subjects: Subject[];
}
