import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { CompletionEntry } from './completion-entry.entity';

export interface CountGoal {
  type: 'Count';
  count: number;
  units: string;
  timeframe: string;
}

export interface QuitGoal {
  type: 'Quit';
  date: Date;
  milestones: boolean;
}

@Entity('habits')
export class Habit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 7 }) // Hex color codes
  color: string;

  @Column('json')
  goal: CountGoal | QuitGoal;

  @Column({ type: 'tinyint', unsigned: true })
  difficulty: 0 | 1 | 2 | 3 | 4;

  @OneToMany(() => CompletionEntry, (completion) => completion.habit, {
    cascade: true,
    eager: true,
  })
  completions: CompletionEntry[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'user_id' })
  userId: string;
}
