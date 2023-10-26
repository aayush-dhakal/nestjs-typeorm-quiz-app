import { Connection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { UserRoles } from '../../modules/user/enums/user.enum';
import { User } from '../../modules/user/user.entity';

export class UserCreateSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await getManager().query('TRUNCATE users'); // first delete the existing table datas

    await factory(User)().create({
      // this create a seed with our own custom data
      name: 'Amitav Roy',
      email: 'reachme@amitavroy.com',
      password: 'Password@123',
      role: UserRoles.ADMIN,
    });

    // await factory(User)().create(); // creates a single seed data. We have configured our seed:run script to take seeds data from factories which uses falso package to generate random datas
    await factory(User)().createMany(20); // creates 20 seeds multiple data

    // await getManager().query('TRUNCATE users');
    // await factory(User)().create({
    //   name: 'Amitav Roy',
    //   email: 'reachme@amitavroy.com',
    //   password: 'Password@123',
    //   role: UserRoles.ADMIN,
    // });
    // await factory(User)().createMany(20);
  }
}
