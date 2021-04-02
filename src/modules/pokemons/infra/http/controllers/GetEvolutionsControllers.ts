import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetEvolutionsService from '@modules/pokemons/services/GetEvolutionsService';

export default class GetEvolutionsControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const getEvolutionsService = container.resolve(GetEvolutionsService);

    const evolution = await getEvolutionsService.execute(id);

    return response.json(evolution);
  }
}
