import { Field, ObjectType } from '@nestjs/graphql';
import { Division } from 'src/division/entity/division';
import { Employee } from 'src/employee/entity/employee';
import { Level } from 'src/level/entity/level';
import { Project } from 'src/project/entity/project';
import { Semester } from 'src/semester/entity/semester';
import { Student } from 'src/student/entity/student';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Archive {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field({})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;

  @ManyToOne(() => Project, (project) => project.archives)
  @Field(() => Project)
  project: Project;

  @Field()
  @Column()
  projectId: string;

  @OneToMany(() => Level, (level) => level.archive)
  @Field(() => [Level])
  levels: Level[];

  // @ManyToMany(() => Semester, (semester) => semester.archives)
  // @Field(() => [Semester])
  // semesters: Semester[];
}
