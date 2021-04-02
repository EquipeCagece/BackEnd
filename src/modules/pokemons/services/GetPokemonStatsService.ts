import { injectable, inject } from 'tsyringe';

import PokemonDTO from '../dtos/PokemonDTO';

import IPokemonsRepository from '../repositories/IPokemonsRepository';

@injectable()
class GetPokemonStatsService {
  constructor(
    @inject('PokemonsRepository')
    private pokemonsRepository: IPokemonsRepository,
  ) {}

  public async execute(name: string): Promise<PokemonDTO> {
    const pokemonStats = this.pokemonsRepository.getPokemonStatsByName(name);

    return pokemonStats;
  }
}

export default GetPokemonStatsService;
