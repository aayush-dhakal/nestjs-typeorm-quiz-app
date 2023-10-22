import { Module } from '@nestjs/common';
import { QuizController } from './controllers/quiz.controller';
import { QuizService } from './services/quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizRepository } from './repositories/quiz.repository';
import { QuestionController } from './controllers/question.controller';
import { QuestionService } from './services/question.service';
import { QuestionRepository } from './repositories/question.repository';

@Module({
  controllers: [QuizController, QuestionController], // quiz module has to know that there is quiz controller
  imports: [TypeOrmModule.forFeature([QuizRepository, QuestionRepository])],
  providers: [QuizService, QuestionService], // we have to define service as well for controller to access it
})
export class QuizModule {}
