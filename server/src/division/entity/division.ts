import { Field, ObjectType } from '@nestjs/graphql';
import { Level } from 'src/level/entity/level';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Division {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @ManyToOne(() => Level, (level) => level.divisions)
  @Field(() => Level)
  level: Level;

  @Field()
  @Column()
  levelId: string;
}
