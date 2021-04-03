import { injectable, inject } from 'tsyringe';

import PokemonDTO from '../dtos/PokemonDTO';

import IPokeApiRepository from '../repositories/IPokeApiRepository';

@injectable()
class GetPokemonStatsService {
  constructor(
    @inject('PokeApiRepository')
    private pokeApiRepository: IPokeApiRepository,
  ) {}

  public async execute(name: string): Promise<PokemonDTO> {
    const pokemonStats = this.pokeApiRepository.getPokemonStatsByName(name);

    return pokemonStats;
  }
}

export default GetPokemonStatsService;
