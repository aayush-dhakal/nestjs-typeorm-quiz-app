import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // look at from which package the Strategy is imported. here it is from local
  constructor(private authService: AuthService) {
    super();
  }

  // this method must have validate name
  async validate(email: string, password: string) {
    const user = await this.authService.validateUserCreds(email, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
