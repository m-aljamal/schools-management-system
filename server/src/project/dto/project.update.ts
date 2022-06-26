import { Project } from 'src/project/entity/project';
import { InputType, PartialType } from '@nestjs/graphql';
import { ProjectInput } from './project.input';

@InputType()
export class UpdateProject extends PartialType(ProjectInput) {}
