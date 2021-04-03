import { injectable, inject } from 'tsyringe';

import PokemonsDTO from '../dtos/PokemonsDTO';

import IPokeApiRepository from '../repositories/IPokeApiRepository';

@injectable()
class SearchPokemonByName {
  constructor(
    @inject('PokeApiRepository')
    private pokeApiRepository: IPokeApiRepository,
  ) {}

  public async execute(name: string): Promise<PokemonsDTO> {
    const pokemonStats = this.pokeApiRepository.searchPokemonByName(name);

    return pokemonStats;
  }
}

export default SearchPokemonByName;
