export interface ILesson {
  id: number;
  title: string;
  content?: ILessonContent[];
}

export interface ILessonContent {
  id: number;
  title: string;
  videoUrl?: string;
  pdfUrl?: string;
}
