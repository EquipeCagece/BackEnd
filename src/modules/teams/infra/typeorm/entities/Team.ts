import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from '../../../../users/infra/typeorm/entities/User';
import PokemonTeam from './PokemonTeam';

@Entity('teams')
class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'team_url' })
  getAvatarUrl(): string | null {
    if (!this.image) {
      return null;
    }
    return `${process.env.APP_API_URL}/files/${this.image}`;
  }

  @ManyToOne(() => User, user => user.teams)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => PokemonTeam, pokemonTeam => pokemonTeam.team, {
    cascade: true,
  })
  @JoinColumn({ name: 'team_id' })
  pokemons: PokemonTeam[];
}

export default Team;
