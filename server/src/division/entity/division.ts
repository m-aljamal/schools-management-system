import { Field, ObjectType } from '@nestjs/graphql';
import { Archive } from 'src/archive/entity/archive';
import { Employee } from 'src/employee/entity/employee';
import { Level } from 'src/level/entity/level';
import { Student } from 'src/student/entity/student';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@ObjectType()
@Entity()
export class Division {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @ManyToOne(() => Level, (level) => level.divisions)
  @Field(() => Level)
  level: Level;

  @Field()
  @Column()
  levelId: string;

  @ManyToMany(() => Student, (student) => student.divisions)
  @Field(() => [Student], { nullable: true })
  students: Student[];

  @ManyToMany(() => Employee, (employee) => employee.divisions)
  @Field(() => [Employee], { nullable: true })
  employees: Employee[];
}
