import { injectable, inject } from 'tsyringe';

import Evolution from '../dtos/EvolutionDTO';

import IPokeApiRepository from '../repositories/IPokeApiRepository';

@injectable()
class GetEvolutionsService {
  constructor(
    @inject('PokeApiRepository')
    private pokeApiRepository: IPokeApiRepository,
  ) {}

  public async execute(id: string): Promise<Evolution> {
    const evolutions = this.pokeApiRepository.getEvolutionsPokemon(id);

    return evolutions;
  }
}

export default GetEvolutionsService;
