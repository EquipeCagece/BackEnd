import { injectable, inject } from 'tsyringe';

import IPokeApiRepository from '@modules/pokemons/repositories/IPokeApiRepository';
import IFavoritesRepository from '../repositories/IFavoritesRepository';
import ReturnFavoritesPokemons from '../dtos/ReturnFavoritesPokemons';

@injectable()
class GetPokemonsFavoritedService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,

    @inject('PokeApiRepository')
    private pokeApiRepository: IPokeApiRepository,
  ) {}

  public async execute(userId: string): Promise<ReturnFavoritesPokemons[]> {
    const favorites = await this.favoritesRepository.findFavoritesByUserId(
      userId,
    );

    const namesPokemons = favorites.map(favorite => favorite.name);

    const returnFavoritesPokemonsFormatted = namesPokemons.map(async name => {
      const response = await this.pokeApiRepository.searchPokemonByName(name);

      return response;
    });

    return Promise.all(returnFavoritesPokemonsFormatted);
  }
}

export default GetPokemonsFavoritedService;
