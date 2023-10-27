import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './modules/quiz/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ApiTokenCheckMiddleware } from './common/middleware/api-token-check.middleware';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  // imports: [QuizModule, TypeOrmModule.forRoot(typeOrmConfig)], // our main app has to know about all other modules
  imports: [
    QuizModule,
    ConfigModule.forRoot({ isGlobal: true }), // we need this to read environment variables in typeorm config
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    EventEmitterModule.forRoot(),
    MulterModule.register({ dest: './uploads' }), // if you are uploading the files to the server itself and want to specify the file upload location then use this configuration else no need for it
    UserModule,
    AuthModule,
  ], // our main app has to know about all other modules
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// if you want to use middleware then use this code
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(ApiTokenCheckMiddleware).forRoutes({
//       // path: '*', // this will apply middleware for all paths
//       path: '/',
//       method: RequestMethod.ALL,
//     }); // tokem middleware is applied to all paths with request method of any get, post,... types
//     // for this project we need to set api-token as header with my-token as value
//   }
// }
