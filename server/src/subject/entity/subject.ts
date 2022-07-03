import { Level } from 'src/level/entity/level';
import { Grade } from './../../grade/entity/grade';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Subject {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => Grade, (grade) => grade.subject)
  @Field(() => [Grade])
  grades: Grade[];

  @ManyToOne(() => Level, (level) => level.subjects)
  @Field(() => Level)
  level: Level;

  @Field()
  @Column()
  levelId: string;
}
