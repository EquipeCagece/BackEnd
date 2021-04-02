import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetPokemonStatsService from '@modules/pokemons/services/GetPokemonStatsService';

export default class PokemonStatsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const getPokemonStatsService = container.resolve(GetPokemonStatsService);

    const evolution = await getPokemonStatsService.execute(name);

    return response.json(evolution);
  }
}
