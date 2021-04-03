import { injectable, inject } from 'tsyringe';

import ITeamsRepository from '../repositories/ITeamsRepository';

import Team from '../infra/typeorm/entities/Team';

@injectable()
class GetTeamsService {
  constructor(
    @inject('TeamsRepository')
    private teamRepository: ITeamsRepository,
  ) {}

  public async execute(user_id: string): Promise<Team[]> {
    const teams = await this.teamRepository.getTeams(user_id);

    return teams;
  }
}

export default GetTeamsService;
