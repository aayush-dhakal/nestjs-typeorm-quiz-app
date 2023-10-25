import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './modules/quiz/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';

@Module({
  // imports: [QuizModule, TypeOrmModule.forRoot(typeOrmConfig)], // our main app has to know about all other modules
  imports: [
    QuizModule,
    ConfigModule.forRoot({ isGlobal: true }), // we need this to read environment variables in typeorm config
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
  ], // our main app has to know about all other modules
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
