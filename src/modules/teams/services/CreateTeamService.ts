import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Team from '../infra/typeorm/entities/Team';

interface Request {
  user_id: string;
  name: string;
  image: string;
}

@injectable()
class CreateTeamService {
  constructor() {}

  public async execute({ user_id, name, image }: Request): Promise<Team> {}
}

export default CreateTeamService;
