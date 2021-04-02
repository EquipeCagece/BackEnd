import { injectable, inject } from 'tsyringe';

import IFavoritesRepository from '../repositories/IFavoritesRepository';
import Favorite from '../infra/typeorm/entities/Favorite';

@injectable()
class GetPokemonsFavoritedService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,
  ) {}

  public async execute(userId: string): Promise<Favorite[]> {
    const favorites = await this.favoritesRepository.findFavoritesByUserId(
      userId,
    );

    return favorites;
  }
}

export default GetPokemonsFavoritedService;
