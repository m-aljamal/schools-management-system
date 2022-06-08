import { Field, ObjectType } from '@nestjs/graphql';
import { AbsentEmployee } from 'src/absent-employee/entity/absent-employee';
import { AbsentStudent } from 'src/absent-student/entity/absent-student';
import { Archive } from 'src/archive/entity/archive';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Semester {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @ManyToMany(() => Archive, (archive) => archive.semesters, {
    cascade: true,
  })
  @Field(() => [Archive])
  @JoinTable()
  archives: Archive[];

  @OneToMany(() => AbsentStudent, (absentStudent) => absentStudent.semester)
  @Field(() => [AbsentStudent])
  absentStudents: AbsentStudent[];

  @OneToMany(() => AbsentEmployee, (absentEmployee) => absentEmployee.semester)
  @Field(() => [AbsentEmployee])
  absentEmployees: AbsentEmployee[];
}
