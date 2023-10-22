import { IsNotEmpty, Length } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @Length(3, 255) // the length should be atleast 3 and less than 255
  question: string;

  @IsNotEmpty()
  quizId: number;
}
