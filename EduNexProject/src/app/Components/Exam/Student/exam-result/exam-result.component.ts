import { Component } from '@angular/core';
import { AnswerChoices, IExamResult } from 'src/app/Model/iexam-result';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';
@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent {
  result!: IExamResult;

  constructor(private dynamicData: DynamicDataService) { }

  getAll() {
    this.dynamicData.getExamResult().subscribe(result => {
      this.result = result
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAnswerChoices(answerChoices: AnswerChoices[]): string[] {
    return answerChoices.map(choice => choice.AnswerHeader);
  }

  getStudentAnswers(studentAnswerIds: number[], answerChoices: AnswerChoices[]): string {
    const selectedAnswers = studentAnswerIds.map(id => answerChoices[id - 1].AnswerHeader);
    return selectedAnswers.join(', ');
  }

  getCorrectAnswers(correctAnswerIds: number[], answerChoices: AnswerChoices[]): string {
    const correctAnswers = correctAnswerIds.map(id => answerChoices[id - 1].AnswerHeader);
    return correctAnswers.join(', ');
  }

  parseIds(ids: (string | number)[]): number[] {
    return ids.map(id => typeof id === 'string' ? parseInt(id, 10) : id);
  }

  isAnswerCorrect(studentAnswerIds: number[], correctAnswerIds: number[]): boolean {
    return JSON.stringify(studentAnswerIds.sort()) === JSON.stringify(correctAnswerIds.sort());
  }

  isCorrectChoice(choice: string, correctAnswerIds: number[]): boolean {
    return correctAnswerIds.includes(parseInt(choice, 10));
  }
}
