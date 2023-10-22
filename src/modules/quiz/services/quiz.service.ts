import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizRepository } from '../repositories/quiz.repository';
import { CreateQuizDto } from '../dto/CreateQuiz.dto';
import { Quiz } from '../entitites/quiz.entity';

@Injectable() // when a class is defined as Injectable then we can use its methods in another class by injecting it
export class QuizService {
  constructor(
    @InjectRepository(QuizRepository) private quizRepository: QuizRepository,
  ) {}

  getAllQuiz() {
    return [1, 2];
  }

  async getQuizById(id: number): Promise<Quiz> {
    // return await this.quizRepository.findOne(id); // you can only find the client if you are maintaing the relation by passing quiz in save question api(see createQuestion's newQuestion method in question.service file)
    return await this.quizRepository.findOne(id, { relations: ['questions'] }); // this will also get the questions realted to the quiz
  }

  async createNewQuiz(quiz: CreateQuizDto) {
    return await this.quizRepository.save(quiz);
  }
}
