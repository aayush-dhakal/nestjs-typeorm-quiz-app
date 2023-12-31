import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { OnEvent } from '@nestjs/event-emitter';
import { QuizRepository } from '../repositories/quiz.repository';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { Quiz } from '../entities/quiz.entity';
import { Question } from '../entities/question.entity';
import { ResponseAddEvent } from '../events/response-add.event';
import { events } from '../../../common/constants/event.constants';

@Injectable() // when a class is defined as Injectable then we can use its methods in another class by injecting it. Services are injectable
export class QuizService {
  constructor(
    @InjectRepository(QuizRepository) private quizRepository: QuizRepository,
  ) {}

  async getAllQuiz(): Promise<Quiz[]> {
    // async getAllQuiz(): Promise<[Quiz[], number]> { // when we use getManyAndCount method the promise returns array of Quiz array and number
    return await this.quizRepository
      .createQueryBuilder('q') // q is just an alias given by us for quiz table
      .leftJoinAndSelect('q.questions', 'qt') // qt is an alias for question table we have to define it as we are joining with quiz's questions column which has association with questions table
      .leftJoinAndSelect('qt.options', 'o') // o is an alias for options table. We are joining questions options with options table by their ids which will be done by typeorm internally
      // .take(1) // this will only take one data from the query. Note that even when take method is used getManyAndCount will still return the total number of datas so this will be useful in pagination
      .getMany();
    // .getManyAndCount(); // sends data and count of all the datas
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Quiz>> {
    const qb = this.quizRepository.createQueryBuilder('q');
    qb.orderBy('q.id', 'DESC');

    return paginate<Quiz>(qb, options); // this paginate is from the typeorm module
  }

  async getQuizById(id: number): Promise<Quiz> {
    // return await this.quizRepository.findOne(id); // you can only find the client if you are maintaing the relation by passing quiz in save question api(see createQuestion's newQuestion method in question.service file)
    // return await this.quizRepository.findOne(id, { relations: ['questions'] }); // this will also get the questions realted to the quiz
    return await this.quizRepository.findOne(id, {
      relations: ['questions', 'questions.options'],
    }); // this will also get the questions and options realted to the quiz
  }

  async createNewQuiz(quiz: CreateQuizDto) {
    return await this.quizRepository.save(quiz);
  }

  @OnEvent(events.RESPONSE_SUBMITTED) // event listener
  checkQuizCompeleted(payload: ResponseAddEvent) {
    console.log('checkQuizCompeleted', payload);
  }
}
