import { Field, ObjectType } from '@nestjs/graphql';
import { Archive } from 'src/archive/entity/archive';
import { Employee } from 'src/employee/entity/employee';
import { Semester } from 'src/semester/entity/semester';
// import { Absent } from 'src/shared/AbsentEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


@ObjectType()
@Entity()
export class Absent {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'timestamp' })
  date: Date;

  @ManyToOne(() => Semester, (semester) => semester.absentStudents)
  @Field(() => Semester)
  semester: Semester;

  @Field()
  @Column()
  semesterId: string;

  @ManyToOne(() => Archive, (archive) => archive.absentStudents)
  @Field(() => Archive)
  archive: Archive;

  @Field()
  @Column()
  archiveId: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  note: string;

  @Field(() => Boolean)
  @Column({ default: false })
  approved: boolean;
}
@ObjectType()
@Entity()
export class AbsentEmployee extends Absent {
  @ManyToOne(() => Employee, (employee) => employee.absentEmployees)
  @Field(() => Employee)
  employee: Employee;

  @Field()
  @Column()
  employeeId: string;
}


