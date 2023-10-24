import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity('options')
export class Option extends BaseEntity {
  // @ApiProperty({ description: 'Primary key as Option ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  // @ApiProperty({ description: 'The actual option', example: 'Owl' })
  @Column({
    type: 'varchar',
  })
  text: string;

  // @ApiProperty({ description: 'Whether option is correct', example: true })
  @Column({
    type: 'boolean',
  })
  isCorrect: boolean;

  @ManyToOne(() => Question, (question) => question.options) // an option is related to one question. options denoted a field defined in question entity. you can name question as anything as it just denoted a single Question data
  question: Question; // this question is our filed name which will be referenced by question entity
}
