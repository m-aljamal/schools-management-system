import { Field, ObjectType } from '@nestjs/graphql';
import { AbsentEmployee } from 'src/absent-employee/entity/absent-employee';
import { Archive } from 'src/archive/entity/archive';
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

  @ManyToMany(() => Archive, (archive) => archive.employees, {
    cascade: true,
  })
  @Field(() => [Archive])
  @JoinTable()
  archives: Archive[];

  @OneToMany(() => AbsentEmployee, (absentEmployee) => absentEmployee.employee)
  @Field(() => [AbsentEmployee])
  absentEmployees: AbsentEmployee[];
}
