import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddPokemonToTeamService from '@modules/teams/services/AddPokemonToTeamService';

export default class TeamsController {
  public async updated(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { pokemon_id, team_id } = request.body;

    const addPokemonToTeamService = container.resolve(AddPokemonToTeamService);

    const data = {
      pokemon_id,
      team_id,
    };

    const team = await addPokemonToTeamService.execute(data);

    return response.json(team);
  }
}
