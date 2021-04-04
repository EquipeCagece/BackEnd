import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Team from '../infra/typeorm/entities/Team';

import ITeamsRepository from '../repositories/ITeamsRepository';

interface Request {
  id: string;
  name: string;
}

@injectable()
class UpdateTeamService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  public async execute({
    id,
    name,
  }: Request): Promise<Team> {
    const team = await this.teamsRepository.getTeamById(id);

    if (!team) {
      throw new AppError('Team not found');
    }

    team.name = name;
    

    return this.teamsRepository.save(team);
  }
}

export default UpdateTeamService;
