import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class TeamsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, image } = request.body;

    const user_id = request.user.id;

    const data = {
      user_id,
      name,
      image,
    };

    return response.json();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    return response.json();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    return response.json();
  }
}
