import { Field, ObjectType } from '@nestjs/graphql';
import { Archive } from 'src/archive/entity/archive';
import { Division } from 'src/division/entity/division';
import { Employee } from 'src/employee/entity/employee';
import { Student } from 'src/student/entity/student';
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

  @ManyToMany(() => Student, (student) => student.levels)
  @Field(() => [Student], { nullable: true })
  students: Student[];

  @ManyToMany(() => Archive, (archive) => archive.levels, {
    cascade: true,
  })
  @Field(() => [Archive])
  @JoinTable()
  archives: Archive[];

  @ManyToMany(() => Employee, (employee) => employee.levels)
  @Field(() => [Student], { nullable: true })
  employees: Employee[];
}
