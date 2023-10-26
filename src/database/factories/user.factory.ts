// factories is somewhere where you define a way a model should be instantiated.
// here this factory is used to generate random user seed datas
import { randEmail, randFullName, randPassword } from '@ngneat/falso'; // falso is used to create fake data
import { define } from 'typeorm-seeding';
import { User } from '../../modules/user/user.entity';

define(User, () => {
  const user = new User();
  user.name = randFullName();
  user.email = randEmail();
  user.password = randPassword();
  return user;
});
