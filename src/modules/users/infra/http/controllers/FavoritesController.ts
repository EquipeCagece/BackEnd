import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FavoritePokemonService from '@modules/users/services/FavoritePokemonService';
import UnFavoritePokemonService from '@modules/users/services/UnFavoritePokemonService';
import GetPokemonsFavoritedService from '@modules/users/services/GetPokemonsFavoritedService';

export default class FavoritesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { pokemon_id } = request.body;

    const data = {
      favorite_id: user_id,
      pokemon_id,
    };

    const favoritePokemon = container.resolve(FavoritePokemonService);

    const favorite = await favoritePokemon.execute(data);

    return response.json(favorite);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const unFavoritePokemon = container.resolve(UnFavoritePokemonService);

    unFavoritePokemon.execute(id);

    return response.status(201).json();
  }

  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const getPokemonsFavorited = container.resolve(GetPokemonsFavoritedService);

    const favorites = await getPokemonsFavorited.execute(user_id);

    return response.status(201).json(favorites);
  }
}
