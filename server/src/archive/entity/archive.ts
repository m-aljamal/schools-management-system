import { Field, ObjectType } from '@nestjs/graphql';
import { Division } from 'src/division/entity/division';
import { Employee } from 'src/employee/entity/employee';
import { Level } from 'src/level/entity/level';
import { Project } from 'src/project/entity/project';
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

  @ManyToMany(() => Employee, (employee) => employee.archives)
  @Field(() => [Employee])
  employees: Employee[];

  @ManyToMany(() => Student, (student) => student.archives)
  @Field(() => [Student])
  students: Student[];

  @ManyToMany(() => Division, (division) => division.archives)
  @Field(() => [Division])
  divisions: Division[];

  @ManyToMany(() => Level, (level) => level.archives)
  @Field(() => [Level])
  levels: Level[];
}
