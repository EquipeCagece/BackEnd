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

    favorites.map(favo => favo.favorite_id);

    const namesPokemons = favorites.map(favorite => {
      return {
        favorite,
      };
    });

    const returnFavoritesPokemonsFormatted = namesPokemons.map(
      async pokemon => {
        const response = await this.pokeApiRepository.searchPokemonByName(
          pokemon.favorite.name,
        );

        return {
          ...response,
          ...pokemon.favorite,
        };
      },
    );

    return Promise.all(returnFavoritesPokemonsFormatted);
  }
}

export default GetPokemonsFavoritedService;
