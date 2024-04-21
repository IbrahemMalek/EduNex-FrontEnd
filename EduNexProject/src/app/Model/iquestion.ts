import { IAnswer } from "./ianswer";

export interface IQuestion {
  questionId: number;
  header: string;
  type: string;
  points: number;
  answers: IAnswer[];
}
