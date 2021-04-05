import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import ShowTeamService from '@modules/teams/services/ShowTeamService';
import CreateTeamService from '@modules/teams/services/CreateTeamService';
import GetTeamsService from '@modules/teams/services/GetTeamsService';
import RemoveTeamService from '@modules/teams/services/RemoveTeamService';

export default class TeamsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name } = request.body;

    const createTeamService = container.resolve(CreateTeamService);

    const data = {
      user_id,
      name,
      image: request.file.filename,
    };

    const team = await createTeamService.execute(data);

    return response.json(classToClass(team));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const getTeamsService = container.resolve(GetTeamsService);

    const teams = await getTeamsService.execute(user_id);

    return response.json(classToClass(teams));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showTeamService = container.resolve(ShowTeamService);

    const team = await showTeamService.execute(id);

    return response.json(classToClass(team));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const removeTeamService = container.resolve(RemoveTeamService);

    await removeTeamService.execute(id);

    return response.status(201).json();
  }
}
