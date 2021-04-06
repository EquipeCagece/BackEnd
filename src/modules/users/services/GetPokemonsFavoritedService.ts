import { injectable, inject } from 'tsyringe';

import IPokemonsProvider from '@shared/container/providers/PokemonsProvider/models/IPokemonsProvider';
import IFavoritesRepository from '../repositories/IFavoritesRepository';
import ReturnFavoritesPokemons from '../dtos/ReturnFavoritesPokemons';

@injectable()
class GetPokemonsFavoritedService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,

    @inject('PokemonsProvider')
    private pokemonsProvider: IPokemonsProvider,
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
        const response = await this.pokemonsProvider.searchPokemonByName(
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
