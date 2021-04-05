import { injectable, inject } from 'tsyringe';
import IFavoritesRepository from '../repositories/IFavoritesRepository';
import Favorite from '../infra/typeorm/entities/Favorite';

interface Request {
  name: string;
  favorite_id: string;
  pokemon_id: number;
}

@injectable()
class FavoritePokemonService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,
  ) {}

  public async execute({
    favorite_id,
    pokemon_id,
    name,
  }: Request): Promise<Favorite> {
    const data = {
      pokemon_id,
      favorite_id,
      name,
    };

    const favorite = await this.favoritesRepository.favoritePokemon(data);

    return favorite;
  }
}

export default FavoritePokemonService;
