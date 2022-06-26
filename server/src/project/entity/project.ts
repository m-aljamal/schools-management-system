import { Student } from 'src/student/entity/student';
import { Employee } from 'src/employee/entity/employee';
import { Field, ObjectType } from '@nestjs/graphql';
import { Archive } from 'src/archive/entity/archive';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Project {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name_ar: string;

  // @Field()
  // @Column()
  // name_en: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field({})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;

  @OneToMany(() => Archive, (archive) => archive.project)
  @Field(() => [Archive], { nullable: true })
  archives: Archive[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  current_archive_name: string;

  @OneToMany(() => Employee, (employee) => employee.project)
  @Field(() => [Employee], { nullable: true })
  employees: Employee[];

  @OneToMany(() => Student, (student) => student.project)
  @Field(() => [Employee], { nullable: true })
  students: Employee[];
}
