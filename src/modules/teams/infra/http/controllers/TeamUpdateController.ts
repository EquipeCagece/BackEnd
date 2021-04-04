import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateTeamService from '@modules/teams/services/UpdateTeamService';


export default class TeamUpdateController {
  async update(request: Request, response: Response): Promise<Response> {
    const { id, name } = request.body;

    const updateProfile = container.resolve(UpdateTeamService);

    const team = await updateProfile.execute({
      id,
      name,
    });

    return response.json(team);
  }
}
