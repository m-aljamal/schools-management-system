import { Field, ObjectType } from '@nestjs/graphql';
import { Division } from 'src/division/entity/division';
import { Student } from 'src/student/entity/student';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Level {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => Division, (division) => division.level)
  @Field(() => [Division], { nullable: true })
  divisions: Division[];

  @OneToMany(() => Student, (student) => student.level)
  @Field(() => [Student], { nullable: true })
  students: Student[];
}
