import { Question } from "./question.interface";

export interface Survey {
    id?: number;
    name: string;
    questions: Array<Question>;
    status?: string;
    createdAt?: Date;
}  