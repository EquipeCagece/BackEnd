import { injectable, inject } from 'tsyringe';

import IFavoritesRepository from '../repositories/IFavoritesRepository';

@injectable()
class UnFavoritePokemonService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const pokemon = await this.favoritesRepository.findById(id);

    await this.favoritesRepository.unFavoritePokemon(pokemon);
  }
}

export default UnFavoritePokemonService;
