import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './modules/quiz/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [QuizModule, TypeOrmModule.forRoot(typeOrmConfig)], // our main app has to know about all other modules
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
