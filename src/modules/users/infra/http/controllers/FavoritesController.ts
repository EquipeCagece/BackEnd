import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FavoritePokemonService from '@modules/users/services/FavoritePokemonService';
import UnFavoritePokemonService from '@modules/users/services/UnFavoritePokemonService';

export default class FavoritesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id, pokemon_id } = request.body;

    const data = {
      id,
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
}
