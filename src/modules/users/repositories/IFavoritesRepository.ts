import Favorite from '../infra/typeorm/entities/Favorite';
import FavoritesPokemonsDTO from '../dtos/FavoritesPokemonsDTO';

export default interface IFavoritesRepository {
  findById(id: string): Promise<Favorite>;
  findFavoritesByUserId(id: string): Promise<Favorite[]>;
  favoritePokemon(data: FavoritesPokemonsDTO): Promise<Favorite>;
  unFavoritePokemon(data: Favorite): Promise<void>;
}
