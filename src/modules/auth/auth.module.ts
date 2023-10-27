import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    // JwtModule.register({
    //   secret: 'asdffgggg',
    //   signOptions: { expiresIn: '1d' },
    // }),
    // JwtModule.register(jwtConfig), // if you are not reading secrets from env then this will work
    JwtModule.registerAsync(jwtConfig), // reading from env is asynchronous process so we have to use asynchronous method here. Also, we are importing JwtModule here so if the user send bearer token in header and if it is authorized then the user object will be appended to the request object throughout the entire request and every controller will have access to it
  ], // we need to import UserModule to use UserService inside auth service
  providers: [AuthService, LocalStrategy, JwtStrategy], // we need to import our defined strategies
  controllers: [AuthController],
})
export class AuthModule {}
