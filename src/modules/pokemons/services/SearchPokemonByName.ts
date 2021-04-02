import { injectable, inject } from 'tsyringe';

import PokemonsDTO from '../dtos/PokemonsDTO';

import IPokemonsRepository from '../repositories/IPokemonsRepository';

@injectable()
class SearchPokemonByName {
  constructor(
    @inject('PokemonsRepository')
    private pokemonsRepository: IPokemonsRepository,
  ) {}

  public async execute(name: string): Promise<PokemonsDTO> {
    const pokemonStats = this.pokemonsRepository.searchPokemonByName(name);

    return pokemonStats;
  }
}

export default SearchPokemonByName;
