import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Exam {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  mark: number;
}
