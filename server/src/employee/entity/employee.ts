import { Field, ObjectType } from '@nestjs/graphql';
import { AbsentEmployee } from 'src/absent-employee/entity/absent-employee';
import { Archive } from 'src/archive/entity/archive';
import { Division } from 'src/division/entity/division';
import { Level } from 'src/level/entity/level';
import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity()
export class Employee {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  // @ManyToMany(() => Archive, (archive) => archive.employees, {
  //   cascade: true,
  // })
  // @Field(() => [Archive])
  // @JoinTable()
  // archives: Archive[];

  @OneToMany(() => AbsentEmployee, (absentEmployee) => absentEmployee.employee)
  @Field(() => [AbsentEmployee])
  absentEmployees: AbsentEmployee[];

  @ManyToMany(() => Level, (level) => level.employees, {
    cascade: true,
  })
  @Field(() => [Level])
  @JoinTable()
  levels: Level[];

  @ManyToMany(() => Division, (division) => division.employees, {
    cascade: true,
  })
  @Field(() => [Division])
  @JoinTable()
  divisions: Division[];

  @Field()
  @Column()
  jobTitle: string;

  @ManyToMany(() => Archive, (archive) => archive.employees, {
    cascade: true,
  })
  @Field(() => [Archive])
  @JoinTable()
  archives: Archive[];

  @Field()
  @Column()
  usename: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  role: string;
}
