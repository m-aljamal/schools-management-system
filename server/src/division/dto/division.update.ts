import { InputType, PartialType } from "@nestjs/graphql";
import { DivisionInput } from "./division.input";

@InputType()
export class DivisionUpdateInput extends PartialType(DivisionInput) {}