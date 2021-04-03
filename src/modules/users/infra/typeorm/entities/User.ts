import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

import Team from '../../../../teams/infra/typeorm/entities/Team';
import Favorite from './Favorite';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  userName: string;

  @Column()
  lastName: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  avatar: string;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }

  @OneToMany(() => Favorite, favorite => favorite.user)
  @JoinColumn({ name: 'favorite_id' })
  favorites: Favorite[];

  @OneToMany(() => Team, team => team.user)
  @JoinColumn({ name: 'user_id' })
  teams: Team[];
}

export default User;
