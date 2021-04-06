import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetPokemonsByUrlService from '@modules/pokemons/services/GetPokemonsByUrlService';

export default class PokemonsByUrlController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { url } = request.query;

    const getPokemonsByUrlService = container.resolve(GetPokemonsByUrlService);

    const pokemons = await getPokemonsByUrlService.execute(String(url));

    return response.json(pokemons);
  }
}
