import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetPokemonsService from '@modules/pokemons/services/GetPokemonsService';
import SearchPokemonByName from '@modules/pokemons/services/SearchPokemonByName';

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

  public async show(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;

    const searchPokemonByName = container.resolve(SearchPokemonByName);

    const pokemons = await searchPokemonByName.execute(name);

    return response.json(pokemons);
  }
}
