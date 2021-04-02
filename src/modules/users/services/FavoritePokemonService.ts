import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IFavoritesRepository from '../repositories/IFavoritesRepository';
import Favorite from '../infra/typeorm/entities/Favorite';

interface Request {
  id: string;
  pokemon_id: number;
}

@injectable()
class FavoritePokemonService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, pokemon_id }: Request): Promise<Favorite> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found!', 401);
    }

    const data = {
      pokemon_id,
      user,
    };

    const favorite = await this.favoritesRepository.favoritePokemon(data);

    return favorite;
  }
}

export default FavoritePokemonService;
