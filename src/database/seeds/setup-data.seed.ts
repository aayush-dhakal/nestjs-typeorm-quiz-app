import { Connection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Option } from '../../modules/quiz/entities/option.entity';
import { Question } from '../../modules/quiz/entities/question.entity';
import { Quiz } from '../../modules/quiz/entities/quiz.entity';
import { quizSampleData } from '../data/quiz.data';

export class SetupData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    // console.log('quizSampleData', quizSampleData);

    // for mysql
    // await getManager().query('SET foreign_key_checks = 0'); // since quiz table has association with other tables as well so we cannot simply delete such tables. We have to first disable the foreign key checking.
    // await getManager().query('TRUNCATE quizes');
    // await getManager().query('TRUNCATE questions');
    // await getManager().query('TRUNCATE options');
    // await getManager().query('SET foreign_key_checks = 1');

    // for postgres
    // await getManager().query('ALTER TABLE quizes DISABLE TRIGGER ALL'); // since quiz table has association with other tables as well so we cannot simply delete such tables. We have to first disable the foreign key checking.
    // await getManager().query('TRUNCATE quizes');
    // await getManager().query('ALTER TABLE quizes ENABLE TRIGGER ALL');
    // await getManager().query('ALTER TABLE questions DISABLE TRIGGER ALL');
    // await getManager().query('TRUNCATE questions');
    // await getManager().query('ALTER TABLE questions ENABLE TRIGGER ALL');
    // await getManager().query('ALTER TABLE options DISABLE TRIGGER ALL');
    // await getManager().query('TRUNCATE options');
    // await getManager().query('ALTER TABLE options ENABLE TRIGGER ALL');

    // for postgres
    await getManager().query('SET session_replication_role = replica'); // since quiz table has association with other tables as well so we cannot simply delete such tables. We have to first disable the foreign key checking.
    await getManager().query('TRUNCATE quizes');
    await getManager().query('TRUNCATE questions');
    await getManager().query('TRUNCATE options');
    await getManager().query('SET session_replication_role = origin');

    for (let i = 0; i < quizSampleData.length; i++) {
      const { quizTitle, quizDescription, questions } = quizSampleData[i];

      const quiz = new Quiz();
      quiz.title = quizTitle;
      quiz.description = quizDescription;
      await quiz.save();

      for (let j = 0; j < questions.length; j++) {
        const { question, options } = questions[j];

        const que = new Question();
        que.question = question;
        que.quiz = quiz;
        await que.save();

        for (let k = 0; k < options.length; k++) {
          const { isCorrect, text } = options[k];
          const opt = new Option();
          opt.isCorrect = isCorrect;
          opt.text = text;
          opt.question = que;
          await opt.save();
        }
      }
    }
  }
}
