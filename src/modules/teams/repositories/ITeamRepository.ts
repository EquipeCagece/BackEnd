import PokemonsDTO from '@modules/pokemons/dtos/PokemonsDTO';
import CreateTeamDTO from '../dtos/CreateTeamDTO';
import TeamPokemonsDTO from '../dtos/TeamPokemonsDTO';
import CalculateTypesDTO from '../dtos/CalculateTypesDTO';
import TeamProfileDTO from '../dtos/TeamProfileDTO';
import Team from '../infra/typeorm/entities/Team';

export default interface ITeamRepository {
  calculeTypes(team: TeamPokemonsDTO): CalculateTypesDTO;
  calcWeakness(pokemons: PokemonsDTO[]): number[];
  calcResistence(pokemons: PokemonsDTO[]): number[];
  getTeam(id: string): Promise<TeamProfileDTO>;
  createTeam(data: CreateTeamDTO): Promise<Team>;
  deleteTeam(data: Team): Promise<void>;
}
