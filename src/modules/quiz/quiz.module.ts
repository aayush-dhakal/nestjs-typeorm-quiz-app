import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizRepository } from './quiz.repository';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionRepository } from './question.repository';

@Module({
  controllers: [QuizController, QuestionController], // quiz module has to know that there is quiz controller
  imports: [TypeOrmModule.forFeature([QuizRepository, QuestionRepository])],
  providers: [QuizService, QuestionService], // we have to define service as well for controller to access it
})
export class QuizModule {}
