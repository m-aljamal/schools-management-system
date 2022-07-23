 import { Field, ObjectType } from '@nestjs/graphql';
  import { Absent } from 'src/shared/AbsentEntity';
import { Student } from 'src/student/entity/student';
import { ChildEntity, Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@ChildEntity()
export class AbsentStudent extends Absent {
  @ManyToOne(() => Student, (student) => student.absentStudents)
  @Field(() => Student)
  student: Student;

  @Field()
  @Column()
  studentId: string;
}
