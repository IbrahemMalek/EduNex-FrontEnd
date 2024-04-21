import { IQuestion } from "./iquestion";

export interface IExam {
  id: number;
  title: string;
  startDateTime: Date;
  endDateTime: Date;
  duration: number;
  type: string;
  questions: IQuestion[];
}
