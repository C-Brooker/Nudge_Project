import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @Column({ type: 'numeric', default: 0 })
  experience: number;

  @Column({ type: 'numeric', default: 1 })
  level: number;

  @Column({ type: 'numeric', default: 0 })
  coins: number;

  @Column({ type: 'numeric', default: 0 })
  habits_completed: number;

  @Column({ type: 'numeric', default: 0 })
  streak: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
