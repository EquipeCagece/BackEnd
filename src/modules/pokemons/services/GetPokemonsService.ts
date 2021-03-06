import { injectable, inject } from 'tsyringe';

import IPokemonsProvider from '@shared/container/providers/PokemonsProvider/models/IPokemonsProvider';
import PokemonsDTO from '@shared/container/providers/PokemonsProvider/dtos/PokemonsDTO';

@injectable()
class GetPokemonsService {
  constructor(
    @inject('PokemonsProvider')
    private pokemonsProvider: IPokemonsProvider,
  ) {}

  public async execute(offset: number, limit: number): Promise<PokemonsDTO[]> {
    const pokemons = this.pokemonsProvider.getPokemons(offset, limit);

    return pokemons;
  }
}

export default GetPokemonsService;
