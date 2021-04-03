import PokemonsDTO from '@modules/pokemons/dtos/PokemonsDTO';
import CreateTeamDTO from '../dtos/CreateTeamDTO';
import TeamPokemonsDTO from '../dtos/TeamPokemonsDTO';
import ReturnCalculeTypesDTO from '../dtos/ReturnCalculeTypesDTO';
import Team from '../infra/typeorm/entities/Team';

export default interface ITeamRepository {
  calculeTypes(team: TeamPokemonsDTO): ReturnCalculeTypesDTO;
  calcWeakness(pokemons: PokemonsDTO[]): number[];
  calcResistence(pokemons: PokemonsDTO[]): number[];
  createTeam(data: CreateTeamDTO): Promise<Team>;
  deleteTeam(data: Team): Promise<void>;
}
