import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('favorites')
class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pokemon_id: number;

  @Column()
  favorite_id: string;

  @ManyToOne(() => User, user => user.favorites)
  @JoinColumn({ name: 'favorite_id' })
  user: User;
}

export default Favorite;
