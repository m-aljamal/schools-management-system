import { Project } from 'src/project/entity/project';
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
  ManyToOne,
} from 'typeorm';
import { Role } from 'utils/enum';

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
  username: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field(() => Role)
  role: Role;

  @ManyToOne(() => Project, (project) => project.employees)
  @Field(() => Project)
  project: Project;

  @Field()
  @Column()
  projectId: string;
}
