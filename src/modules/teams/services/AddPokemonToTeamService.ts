import { injectable, inject } from 'tsyringe';

import IPokeApiRepository from '@modules/pokemons/repositories/IPokeApiRepository';
import AppError from '@shared/errors/AppError';
import IPokemonsTeamsRepository from '../repositories/IPokemonsTeamsRepository';

import PokemonTeam from '../infra/typeorm/entities/PokemonTeam';

interface Request {
  team_id: string;
  pokemon_id: number;
}

@injectable()
class AddPokemonToTeamService {
  constructor(
    @inject('PokemonsTeamsRepository')
    private pokemonsTeamsRepository: IPokemonsTeamsRepository,

    @inject('PokeApiRepository')
    private pokeApiRepository: IPokeApiRepository,
  ) {}

  public async execute({ pokemon_id, team_id }: Request): Promise<PokemonTeam> {
    const pokemon = await this.pokeApiRepository.getPokemonData(
      String(pokemon_id),
    );

    const pokemonsInTeam = await this.pokemonsTeamsRepository.getPokemonsByTeamId(
      team_id,
    );

    const pokemonAlreadyInTeam = pokemonsInTeam.filter(
      poke => poke.name === pokemon.name,
    );

    if (pokemonAlreadyInTeam.length !== 0) {
      throw new AppError('Pokemon Already in team!');
    }

    const pokemonFormatted = {
      name: pokemon.name,
      type1: pokemon.types[0].type.name,
      type2: pokemon.types[1]?.type.name,
      team_id,
    };

    const team = await this.pokemonsTeamsRepository.addPokemonToTeam(
      pokemonFormatted,
    );

    return team;
  }
}

export default AddPokemonToTeamService;
