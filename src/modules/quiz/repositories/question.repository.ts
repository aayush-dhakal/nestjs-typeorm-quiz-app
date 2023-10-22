import { EntityRepository, Repository } from 'typeorm';
import { Question } from '../entitites/question.entity';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {}
