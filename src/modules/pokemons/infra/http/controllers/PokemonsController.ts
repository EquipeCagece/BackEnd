import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetPokemonsService from '@modules/pokemons/services/GetPokemonsService';

export default class PokemonsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { offset, limit } = request.query;

    const getPokemonsService = container.resolve(GetPokemonsService);

    const pokemons = await getPokemonsService.execute(
      Number(offset),
      Number(limit),
    );

    return response.json(pokemons);
  }
}
