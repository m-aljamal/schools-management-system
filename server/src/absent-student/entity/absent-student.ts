import { Field, ObjectType } from '@nestjs/graphql';
import { Semester } from 'src/semester/entity/semester';
import { Student } from 'src/student/entity/student';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class AbsentStudent {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'timestamp' })
  date: Date;

  @ManyToOne(() => Student, (student) => student.absentStudents)
  @Field(() => Student)
  student: Student;

  @Field()
  @Column()
  studentId: string;

  @ManyToOne(() => Semester, (semester) => semester.absentStudents)
  @Field(() => Semester)
  semester: Semester;

  @Field()
  @Column()
  semesterId: string;
}