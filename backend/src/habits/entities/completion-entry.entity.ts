import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Habit } from './habit.entity';

@Entity('completion_entries')
export class CompletionEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn({ name: 'timestamp', nullable: true })
  timestamp?: Date;

  @ManyToOne(() => Habit, (habit) => habit.completions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'habit_id' })
  habit: Habit;

  @Column({ name: 'habit_id' })
  habitId: number;
}
