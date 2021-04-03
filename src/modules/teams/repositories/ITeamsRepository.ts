import CreateTeamDTO from '../dtos/CreateTeamDTO';
import CalculateTypesDTO from '../dtos/CalculateTypesDTO';
import TeamProfileDTO from '../dtos/TeamProfileDTO';
import Team from '../infra/typeorm/entities/Team';
import PokemonTeam from '../infra/typeorm/entities/PokemonTeam';

export default interface ITeamsRepository {
  calculeTypes(team: Team): CalculateTypesDTO;
  calcWeakness(pokemons: PokemonTeam[]): number[];
  calcResistence(pokemons: PokemonTeam[]): number[];
  createTeam(data: CreateTeamDTO): Promise<Team>;
  getTeams(id: string): Promise<Team[]>;
  getTeamProfile(id: string): Promise<TeamProfileDTO>;
  deleteTeam(data: Team): Promise<void>;
}
