import { injectable, inject } from 'tsyringe';

import ITeamsRepository from '../repositories/ITeamsRepository';

import Team from '../infra/typeorm/entities/Team';

interface Request {
  user_id: string;
  name: string;
  image: string;
}

@injectable()
class CreateTeamService {
  constructor(
    @inject('TeamsRepository')
    private teamRepository: ITeamsRepository,
  ) {}

  public async execute({ user_id, name, image }: Request): Promise<Team> {
    const data = {
      name,
      image,
      user_id,
    };

    const team = await this.teamRepository.createTeam(data);

    return team;
  }
}

export default CreateTeamService;
