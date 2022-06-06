import { Field, ObjectType } from '@nestjs/graphql';
import { Archive } from 'src/archive/entity/archive';
import { Division } from 'src/division/entity/division';
import { Level } from 'src/level/entity/level';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Student {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @ManyToOne(() => Level, (level) => level.students)
  @Field(() => Level)
  level: Level;

  @Field()
  @Column()
  levelId: string;

  @ManyToOne(() => Division, (division) => division.students)
  @Field(() => Division)
  division: Division;

  @Field()
  @Column()
  divisionId: string;

  @ManyToMany(() => Archive, (archive) => archive.employees, {
    cascade: true,
  })
  @Field(() => [Archive])
  @JoinTable()
  archives: Archive[];
}
