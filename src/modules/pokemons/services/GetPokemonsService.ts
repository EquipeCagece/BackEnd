import { injectable, inject } from 'tsyringe';

import PokemonsDTO from '../dtos/PokemonsDTO';

import IPokeApiRepository from '../repositories/IPokeApiRepository';

@injectable()
class GetPokemonsService {
  constructor(
    @inject('PokeApiRepository')
    private pokeApiRepository: IPokeApiRepository,
  ) {}

  public async execute(offset: number, limit: number): Promise<PokemonsDTO[]> {
    const pokemons = this.pokeApiRepository.getPokemons(offset, limit);

    return pokemons;
  }
}

export default GetPokemonsService;
