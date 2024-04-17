import { ILessonContent } from "./ilesson-content";

export interface ILesson {
  id: number;
  title: string;
  teacher: string;
  subject: string;
  content: ILessonContent[];
}
