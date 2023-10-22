import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionRepository } from './question.repository';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './question.entity';
import { Quiz } from './quiz.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionRepository)
    private questionRepository: QuestionRepository,
  ) {}

  // async findQuestionById(id: number): Promise<Question> {
  //   return await this.questionRepository.findOne(id, {
  //     relations: ['quiz', 'options'],
  //   });
  // }

  async createQuestion(
    question: CreateQuestionDto,
    quiz: Quiz,
  ): Promise<Question> {
    const newQuestion = await this.questionRepository.save({
      question: question.question,
      // quiz, // you can simply pass the quiz here to refer to the relation or update quiz.questions like below
    });

    // you don't need these two if you are just passing quiz while creating question in above function
    quiz.questions = [...quiz.questions, newQuestion];
    await quiz.save();

    return newQuestion;
  }
}
