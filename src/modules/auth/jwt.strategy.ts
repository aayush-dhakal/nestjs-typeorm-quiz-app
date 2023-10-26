import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import appConfig from '../../config/app.config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  // look at from which package the Strategy is imported. here it is from jwt
  constructor() {
    // validation actualyy happend in this super constructor
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig().appSecret,
    });
  }

  // when the user is successfully validated the it will return the response as defined in this function
  async validate(payload: any) {
    // this returned object will be available as user request in auth controller get user method
    return {
      id: payload.sub,
      name: payload.name,
      // you can also add additional data to the response like
      isKind: 'Yes',
    };
  }
}
