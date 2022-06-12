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
  OneToMany,
  ManyToMany,
  JoinTable,
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

  @OneToMany(() => Student, (student) => student.division)
  @Field(() => [Student])
  students: Student[];

  @ManyToMany(() => Archive, (archive) => archive.divisions, {
    cascade: true,
  })
  @Field(() => [Archive])
  @JoinTable()
  archives: Archive[];

  @ManyToMany(() => Employee, (employee) => employee.divisions)
  @Field(() => [Student], { nullable: true })
  employees: Employee[];
}
