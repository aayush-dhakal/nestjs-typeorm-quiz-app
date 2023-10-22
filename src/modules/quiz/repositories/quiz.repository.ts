import { EntityRepository, Repository } from 'typeorm';
import { Quiz } from '../entitites/quiz.entity';

@EntityRepository(Quiz)
export class QuizRepository extends Repository<Quiz> {}
