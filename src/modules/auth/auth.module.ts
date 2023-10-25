import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'asdffgggg',
      signOptions: { expiresIn: '1d' },
    }),
  ], // we need to import UserModule to use UserService inside auth service
  providers: [AuthService, LocalStrategy, JwtStrategy], // we need to import our defined strategies
  controllers: [AuthController],
})
export class AuthModule {}
