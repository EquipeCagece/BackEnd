import { injectable, inject } from 'tsyringe';

import PokemonsDTO from '@shared/container/providers/PokemonsProvider/dtos/PokemonsDTO';

import IPokemonsProvider from '@shared/container/providers/PokemonsProvider/models/IPokemonsProvider';

@injectable()
class SearchPokemonByName {
  constructor(
    @inject('PokemonsProvider')
    private pokemonsProvider: IPokemonsProvider,
  ) {}

  public async execute(name: string): Promise<PokemonsDTO> {
    const pokemonStats = this.pokemonsProvider.searchPokemonByName(name);

    return pokemonStats;
  }
}

export default SearchPokemonByName;
