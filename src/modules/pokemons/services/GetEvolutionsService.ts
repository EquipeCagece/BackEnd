import { injectable, inject } from 'tsyringe';

import Evolution from '../dtos/EvolutionDTO';

import IPokemonsRepository from '../repositories/IPokemonsRepository';

@injectable()
class GetEvolutionsService {
  constructor(
    @inject('PokemonsRepository')
    private pokemonsRepository: IPokemonsRepository,
  ) {}

  public async execute(id: string): Promise<Evolution> {
    const evolutions = this.pokemonsRepository.getEvolutionsPokemon(id);

    return evolutions;
  }
}

export default GetEvolutionsService;
