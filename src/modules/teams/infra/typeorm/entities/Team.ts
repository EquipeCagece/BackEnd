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

  @ManyToOne(() => User, user => user.teams)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => PokemonTeam, pokemonTeam => pokemonTeam.team)
  @JoinColumn({ name: 'team_id' })
  pokemons: PokemonTeam[];
}

export default Team;
