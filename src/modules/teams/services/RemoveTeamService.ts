import { injectable, inject } from 'tsyringe';

import ITeamsRepository from '../repositories/ITeamsRepository';

@injectable()
class RemoveTeamService {
  constructor(
    @inject('TeamsRepository')
    private teamRepository: ITeamsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.teamRepository.deleteTeam(id);
  }
}

export default RemoveTeamService;
