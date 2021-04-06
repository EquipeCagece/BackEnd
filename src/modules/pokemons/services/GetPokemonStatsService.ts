import { injectable, inject } from 'tsyringe';

import PokemonDTO from '@shared/container/providers/PokemonsProvider/dtos/PokemonDTO';

import IPokemonsProvider from '@shared/container/providers/PokemonsProvider/models/IPokemonsProvider';

@injectable()
class GetPokemonStatsService {
  constructor(
    @inject('PokemonsProvider')
    private pokemonsProvider: IPokemonsProvider,
  ) {}

  public async execute(name: string): Promise<PokemonDTO> {
    const pokemonStats = this.pokemonsProvider.getPokemonStatsByName(name);

    return pokemonStats;
  }
}

export default GetPokemonStatsService;
