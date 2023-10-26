import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

import appConfig from './app.config';

// if you are reading secrets from env then you need to modify the function to make it asynchronous as accessing env is an asynchronous process
export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: appConfig().appSecret,
      signOptions: { expiresIn: '1d' },
    };
  },
};

// this will only work if you are using hard coded values in secret
// export const jwtConfig: JwtModuleOptions = {
//   secret: 'asdffgggg',
//   signOptions: { expiresIn: '1d' },
// };
