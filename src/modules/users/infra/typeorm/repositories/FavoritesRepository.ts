import { getRepository, Repository } from 'typeorm';

import IFavoritesRepository from '@modules/users/repositories/IFavoritesRepository';
import FavoritesPokemonsDTO from '@modules/users/dtos/FavoritesPokemonsDTO';

import Favorite from '../entities/Favorite';

class FavoritesRepository implements IFavoritesRepository {
  private ormRepository: Repository<Favorite>;

  constructor() {
    this.ormRepository = getRepository(Favorite);
  }

  public async findById(id: string): Promise<Favorite> {
    const pokemon = await this.ormRepository.findOneOrFail(id);

    return pokemon;
  }

  public async findFavoritesByUserId(favorite_id: string): Promise<Favorite[]> {
    const pokemon = await this.ormRepository.find({
      where: { favorite_id },
    });

    return pokemon;
  }

  public async favoritePokemon(data: FavoritesPokemonsDTO): Promise<Favorite> {
    const favorite = this.ormRepository.create(data);

    await this.ormRepository.save(favorite);

    return favorite;
  }

  public async unFavoritePokemon(data: Favorite): Promise<void> {
    await this.ormRepository.remove(data);
  }
}

export default FavoritesRepository;
