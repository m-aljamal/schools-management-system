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
  JoinTable,
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

  @Field(() => Number)
  @Column()
  number: number;

  @OneToMany(() => Division, (division) => division.level)
  @Field(() => [Division], { nullable: true })
  divisions: Division[];

  @ManyToMany(() => Student, (student) => student.levels)
  @Field(() => [Student], { nullable: true })
  students: Student[];

  @ManyToMany(() => Employee, (employee) => employee.levels)
  @Field(() => [Employee], { nullable: true })
  employees: Employee[];

  // @ManyToOne(() => Archive, (archive) => archive.levels)
  // @Field(() => Archive)
  // archive: Archive;

  // @Field()
  // @Column()
  // archiveId: string;

  @ManyToMany(() => Archive, (archive) => archive.levels, {
    cascade: true,
  })
  @Field(() => [Archive])
  @JoinTable()
  archives: Archive[];

  @OneToMany(() => Exam, (exam) => exam.level)
  @Field(() => [Exam])
  exams: Exam[];

  @OneToMany(() => Subject, (subject) => subject.level)
  @Field(() => [Subject])
  subjects: Subject[];
}
