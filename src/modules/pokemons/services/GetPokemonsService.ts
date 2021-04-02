import { injectable, inject } from 'tsyringe';

import PokemonsDTO from '../dtos/PokemonsDTO';

import IPokemonsRepository from '../repositories/IPokemonsRepository';

@injectable()
class GetPokemonsService {
  constructor(
    @inject('PokemonsRepository')
    private pokemonsRepository: IPokemonsRepository,
  ) {}

  public async execute(offset: number, limit: number): Promise<PokemonsDTO[]> {
    const pokemons = this.pokemonsRepository.getPokemons(offset, limit);

    return pokemons;
  }
}

export default GetPokemonsService;
