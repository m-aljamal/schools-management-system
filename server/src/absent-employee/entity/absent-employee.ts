import { Field, ObjectType } from '@nestjs/graphql';
import { Archive } from 'src/archive/entity/archive';
import { Employee } from 'src/employee/entity/employee';
import { Semester } from 'src/semester/entity/semester';
import { Absent } from 'src/shared/AbsentEntity';
import { ChildEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@ChildEntity()
export class AbsentEmployee extends Absent {
 
  @ManyToOne(() => Employee, (employee) => employee.absentEmployees)
  @Field(() => Employee)
  employee: Employee;

  @Field()
  @Column()
  employeeId: string;
}
