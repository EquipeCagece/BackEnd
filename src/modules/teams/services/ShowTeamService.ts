import { injectable, inject } from 'tsyringe';

import TeamProfileDTO from '../dtos/TeamProfileDTO';
import ITeamRepository from '../repositories/ITeamRepository'

@injectable()
class CreateTeamService {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository
  ) {}

  public async execute(id: string): Promise<TeamProfileDTO> {
    const profile = await this.teamRepository.getTeamProfile(id);

    return profile;
  }
}

export default CreateTeamService;
