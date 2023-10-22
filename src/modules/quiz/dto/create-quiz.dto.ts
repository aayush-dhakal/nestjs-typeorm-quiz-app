import { IsNotEmpty, Length } from 'class-validator';

export class CreateQuizDto {
  @IsNotEmpty({ message: 'The quiz should have a title' })
  @Length(3, 255) // the length should be atleast 3 and less than 255
  title: string;

  @IsNotEmpty()
  @Length(3) // the length should be atleast 3
  description: string;
}
