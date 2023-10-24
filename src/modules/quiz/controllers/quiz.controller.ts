import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { Quiz } from '../entities/quiz.entity';

@Controller('quiz') // route will start from /quiz
export class QuizController {
  constructor(private quizService: QuizService) {} // with this we can now use the methods from serive class without worring for its object creation

  @Get('/') // route will be /quiz
  async getAllQuiz(): Promise<Quiz[]> {
    // async getAllQuiz(): Promise<[Quiz[], number]> { use this type when using getManyAndCount method in service
    return await this.quizService.getAllQuiz();
  }

  @Get('/:id')
  async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
    return await this.quizService.getQuizById(id);
  }

  @Post()
  // @HttpCode(200) // to give custom http code. By default post has 201 http code
  @UsePipes(ValidationPipe) // this is basically like a middleware used to validate request body
  async createQuiz(@Body() quizData: CreateQuizDto) {
    // the type of quizData is set to CreateQuizDto for validation
    // to access request body use @Body() decorator
    return await this.quizService.createNewQuiz(quizData);
  }
}
