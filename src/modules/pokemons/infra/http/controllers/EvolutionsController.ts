import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetEvolutionsService from '@modules/pokemons/services/GetEvolutionsService';

export default class EvolutionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;

    const getEvolutionsService = container.resolve(GetEvolutionsService);

    const evolution = await getEvolutionsService.execute(name);

    return response.json(evolution);
  }
}
