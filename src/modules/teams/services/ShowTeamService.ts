import { injectable, inject } from 'tsyringe';

import TeamProfileDTO from '../dtos/TeamProfileDTO';
import ITeamsRepository from '../repositories/ITeamsRepository';

@injectable()
class ShowTeamService {
  constructor(
    @inject('TeamsRepository')
    private teamRepository: ITeamsRepository,
  ) {}

  public async execute(id: string): Promise<TeamProfileDTO> {
    const profile = await this.teamRepository.getTeamProfile(id);

    return profile;
  }
}

export default ShowTeamService;
