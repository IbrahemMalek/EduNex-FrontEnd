  import { ILesson } from "./ilesson";

  export interface ICourse {
    id: number;
    imageUrl: string;
    subject: string;
    profilePictureUrl: string;
    teacher: string;
    description: string;
    grade: string;
    price: number;
    lesson?: ILesson[];
  }
