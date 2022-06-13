import { Field, ObjectType } from '@nestjs/graphql';
import { Archive } from 'src/archive/entity/archive';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Project {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name_ar: string;

  // @Field()
  // @Column()
  // name_en: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field({})
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  updatedAt: Date;

  @OneToMany(() => Archive, (archive) => archive.project)
  @Field(() => [Archive], { nullable: true })
  archives: Archive[];

  @Field()
  @Column()
  current_archive_id: string;
}
