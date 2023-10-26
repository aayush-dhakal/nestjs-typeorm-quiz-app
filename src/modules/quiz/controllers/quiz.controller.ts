import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { QuizService } from '../services/quiz.service';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { Quiz } from '../entities/quiz.entity';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ApiPaginatedResponse } from 'src/common/decorator/api-pagination.response';

@ApiTags('quiz')
@Controller('quiz') // route will start from /quiz
export class QuizController {
  constructor(private quizService: QuizService) {} // with this we can now use the methods from serive class without worring for its object creation

  @Get('/no-pagination') // route will be /quiz/no-pagination
  async getAllQuizWithNoPagination(): Promise<Quiz[]> {
    // async getAllQuiz(): Promise<[Quiz[], number]> { use this type when using getManyAndCount method in service
    return await this.quizService.getAllQuiz();
  }

  @Get('/')
  @ApiPaginatedResponse({ model: Quiz, description: 'List of quizzes' }) // it seems like I don't even need this decorator as root level ApiTags seems to handle automatically
  async getAllQuiz(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 1,
  ): Promise<Pagination<Quiz>> {
    const options: IPaginationOptions = {
      limit,
      page,
    };
    return await this.quizService.paginate(options);
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
