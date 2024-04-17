import { ILessonContent } from "./ilesson-content";

export interface ILesson {
  id: number;
  title: string;
  content?: ILessonContent[];
}
