import { Project } from 'src/project/entity/project';
import { Field, ObjectType } from '@nestjs/graphql';
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
import { AbsentEmployee } from 'src/shared/AbsentEntity';

@ObjectType()
@Entity()
export class Employee {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => AbsentEmployee, (absentEmployee) => absentEmployee.employee)
  @Field(() => [AbsentEmployee])
  absentEmployees: AbsentEmployee[];

  @ManyToMany(() => Level, (level) => level.employees, {
    cascade: true,
    nullable: true,
  })
  @Field(() => [Level], { nullable: true })
  @JoinTable()
  levels: Level[];

  @ManyToMany(() => Division, (division) => division.employees, {
    cascade: true,
  })
  @Field(() => [Division], { nullable: true })
  @JoinTable()
  divisions: Division[];

  @ManyToMany(() => Archive, (archive) => archive.employees, {
    cascade: true,
  })
  @Field(() => [Archive], { nullable: true })
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
  @Field(() => Project, { nullable: true })
  project: Project;

  @Field({ nullable: true })
  @Column({ nullable: true })
  projectId: string;
}
