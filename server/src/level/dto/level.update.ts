import { InputType, PartialType } from '@nestjs/graphql';
import { LevelInput } from './level.input';

@InputType()
export class LevelUpdateInput extends PartialType(LevelInput) {}
