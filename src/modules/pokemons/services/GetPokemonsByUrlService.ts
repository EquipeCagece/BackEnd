import { injectable, inject } from 'tsyringe';

import IPokemonsProvider from '@shared/container/providers/PokemonsProvider/models/IPokemonsProvider';
import PokemonsDTO from '@shared/container/providers/PokemonsProvider/dtos/PokemonsDTO';

@injectable()
class GetPokemonsByUrlService {
  constructor(
    @inject('PokemonsProvider')
    private pokemonsProvider: IPokemonsProvider,
  ) {}

  public async execute(url: string): Promise<PokemonsDTO[]> {
    const pokemons = this.pokemonsProvider.getPokemonsByUrl(url);

    return pokemons;
  }
}

export default GetPokemonsByUrlService;
