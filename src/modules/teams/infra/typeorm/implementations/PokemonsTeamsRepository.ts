import { getRepository, Repository } from 'typeorm';

import IPokemonsTeamsRepository from '@modules/teams/repositories/IPokemonsTeamsRepository';

import PokemonsTeamDTO from '@modules/teams/dtos/PokemonsTeamDTO';
import PokemonTeam from '../entities/PokemonTeam';

class PokemonsTeamsRepository implements IPokemonsTeamsRepository {
  private ormRepository: Repository<PokemonTeam>;

  constructor() {
    this.ormRepository = getRepository(PokemonTeam);
  }

  public async addPokemonToTeam(
    pokemon: PokemonsTeamDTO,
  ): Promise<PokemonTeam> {
    const pokemonCreated = this.ormRepository.create(pokemon);

    await this.ormRepository.save(pokemonCreated);

    return pokemonCreated;
  }

  public async getPokemonsByTeamId(team_id: string): Promise<PokemonTeam[]> {
    const pokemons = await this.ormRepository.find({
      where: { team_id },
    });

    return pokemons;
  }
}

export default PokemonsTeamsRepository;
