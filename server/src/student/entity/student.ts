import { Field, ObjectType } from '@nestjs/graphql';
import { Archive } from 'src/archive/entity/archive';
import { Division } from 'src/division/entity/division';
import { ExamResult } from 'src/exam-result/entity/exam-result';
import { Grade } from 'src/grade/entity/grade';
import { Level } from 'src/level/entity/level';
import { Project } from 'src/project/entity/project';
import { AbsentStudent } from 'src/shared/AbsentEntity';
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
import { Role } from 'utils/enum';

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

  @ManyToMany(() => Division, (division) => division.students, {
    cascade: true,
  })
  @Field(() => [Division])
  @JoinTable()
  divisions: Division[];

  @ManyToMany(() => Archive, (archive) => archive.students, {
    cascade: true,
  })
  @Field(() => [Archive], { nullable: true })
  @JoinTable()
  archives: Archive[];

  @OneToMany(() => AbsentStudent, (absentStudent) => absentStudent.student)
  @Field(() => [AbsentStudent])
  absentStudents: AbsentStudent[];

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @Field({ defaultValue: 'student' })
  @Column({
    enum: Role,
    default: Role.STUDENT,
    type: 'enum',
  })
  role: Role;

  @ManyToOne(() => Project, (project) => project.students)
  @Field(() => Project)
  project: Project;

  @Field()
  @Column()
  projectId: string;

  @OneToMany(() => Grade, (grade) => grade.student)
  @Field(() => [Grade])
  grades: Grade[];
  //todo create current student level

  @OneToMany(() => ExamResult, (examResult) => examResult.student)
  @Field(() => [ExamResult], { nullable: true })
  examResults: ExamResult[];
}
