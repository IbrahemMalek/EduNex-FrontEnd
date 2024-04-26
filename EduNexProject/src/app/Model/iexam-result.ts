export interface IExamResult {
  SubmitResult: string;
  ExamName: string;
  ExamType: string;
  ExamGrade: number;
  StudentGrade: number;
  StudentAnswersWithCorrectAnswers: Question[];
}

export interface Question {
  QuestionId: number;
  QuestionHeader: string;
  QuestionType: string;
  AnswerChoices: AnswerChoices[];
  StudentAnswerIds: (number | string)[];
  CorrectAnswerIds: (number | string)[];
  IsCorrect: boolean;
}

export interface AnswerChoices {
  AnswerId: number;
  AnswerHeader: string;
}
