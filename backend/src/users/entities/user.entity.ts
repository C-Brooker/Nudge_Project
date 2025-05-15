import { RefreshToken } from 'src/auth/entities/token.entity';
import { Message } from 'src/gemini/entities/message.entity';
import { Profile } from 'src/profiles/entities/profile.entity';

import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToOne(() => Profile, (profile) => profile.user_id, { cascade: true })
  profile: Profile;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}
