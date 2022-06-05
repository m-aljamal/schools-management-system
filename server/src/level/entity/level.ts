import { Field, ObjectType } from '@nestjs/graphql';
import { Division } from 'src/division/entity/division';
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
}
