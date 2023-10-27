import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Option } from './option.entity';
import { Quiz } from './quiz.entity';

@Entity('questions')
export class Question extends BaseEntity {
  @ApiProperty({
    description: 'The primary ID of question.',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The actual question',
    example: 'What is the question?',
  })
  @Column({
    type: 'varchar',
  })
  question: string;

  @ApiProperty({
    description: 'Quiz of the question',
  })
  @ManyToOne(() => Quiz, (quiz) => quiz.questions) // questions will be a field defined in quiz.entity
  quiz: Quiz;

  @ApiProperty({
    description: 'Options of the question',
  })
  @OneToMany(() => Option, (option) => option.question) // one question can have many options. question is a field defined in option entity. you can name option as anything as it just denoted a single Option data
  options: Option[]; // this options is our filed name which will be referenced by option entity
}
