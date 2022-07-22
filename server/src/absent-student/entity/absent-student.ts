 import { Field, ObjectType } from '@nestjs/graphql';
  import { Absent } from 'src/shared/AbsentEntity';
import { Student } from 'src/student/entity/student';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class AbsentStudent extends Absent {
  @ManyToOne(() => Student, (student) => student.absentStudents)
  @Field(() => Student)
  student: Student;

  @Field()
  @Column()
  studentId: string;
}
