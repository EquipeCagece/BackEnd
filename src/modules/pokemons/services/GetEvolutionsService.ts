import { injectable, inject } from 'tsyringe';

import IPokemonsProvider from '@shared/container/providers/PokemonsProvider/models/IPokemonsProvider';
import EvolutionDTO from '@shared/container/providers/PokemonsProvider/dtos/EvolutionDTO';

@injectable()
class GetEvolutionsService {
  constructor(
    @inject('PokemonsProvider')
    private pokemonsProvider: IPokemonsProvider,
  ) {}

  public async execute(id: string): Promise<EvolutionDTO> {
    const evolutions = this.pokemonsProvider.getEvolutionsPokemon(id);

    return evolutions;
  }
}

export default GetEvolutionsService;
