import { InputType } from "@nestjs/graphql";

@InputType()
export class ExamInput {
    marks: number;
    
}
