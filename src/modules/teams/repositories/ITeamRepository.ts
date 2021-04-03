import CreateTeamDTO from '../dtos/CreateTeamDTO';
import CalculateTypesDTO from '../dtos/CalculateTypesDTO';
import TeamProfileDTO from '../dtos/TeamProfileDTO';
import Team from '../infra/typeorm/entities/Team';
import PokemonTeam from '../infra/typeorm/entities/PokemonTeam';

export default interface ITeamRepository {
  calculeTypes(team: Team): CalculateTypesDTO;
  calcWeakness(pokemons: PokemonTeam[]): number[];
  calcResistence(pokemons: PokemonTeam[]): number[];
  getTeamProfile(id: string): Promise<TeamProfileDTO>;
  createTeam(data: CreateTeamDTO): Promise<Team>;
  deleteTeam(data: Team): Promise<void>;
}
