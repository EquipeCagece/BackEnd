import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import Team from './Team'

@Entity('teams')
class PokemonTeam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type1: string;

  @Column()
  type2: string;

  @Column()
  team_id: string;

  @ManyToOne(() => Team, team => team.pokemons)
  @JoinColumn({name: 'team_id'})
  team: Team;
}


export default PokemonTeam;
