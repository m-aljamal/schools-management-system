import { Field, ObjectType } from '@nestjs/graphql';
import { AbsentStudent } from 'src/absent-student/entity/absent-student';
import { Division } from 'src/division/entity/division';
import { Grade } from 'src/grade/entity/grade';
import { Level } from 'src/level/entity/level';
import { Project } from 'src/project/entity/project';
import {
  Column,
  Entity,
  Index,
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

  @ManyToOne(() => Division, (division) => division.students)
  @Field(() => Division)
  division: Division;

  @Field()
  @Column()
  divisionId: string;

  @ManyToOne(() => Level, (level) => level.students)
  @Field(() => Level)
  level: Level;

  @Field()
  @Column()
  levelId: string;

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
}
