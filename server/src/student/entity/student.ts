import { Field, ObjectType } from '@nestjs/graphql';
import { AbsentStudent } from 'src/absent-student/entity/absent-student';
import { Archive } from 'src/archive/entity/archive';
import { Division } from 'src/division/entity/division';
import { Level } from 'src/level/entity/level';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Student {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Field()
  @Column()
  name: string;

  @ManyToMany(() => Level, (level) => level.students, {
    cascade: true,
  })
  @Field(() => [Level])
  @JoinTable()
  levels: Level[];

  @ManyToOne(() => Division, (division) => division.students)
  @Field(() => Division)
  division: Division;

  @Field()
  @Column()
  divisionId: string;

  @ManyToMany(() => Archive, (archive) => archive.students, {
    cascade: true,
  })
  @Field(() => [Archive])
  @JoinTable()
  archives: Archive[];

  @OneToMany(() => AbsentStudent, (absentStudent) => absentStudent.student)
  @Field(() => [AbsentStudent])
  absentStudents: AbsentStudent[];
}
