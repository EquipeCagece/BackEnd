import PokemonsDTO from "@modules/pokemons/dtos/PokemonsDTO";
import CreateTeamDTO from "../dtos/CreateTeamDTO";
import TeamPokemonsDTO from "../dtos/TeamPokemonsDTO";
import Team from "../infra/typeorm/entites/Team";

export default interface ITeamRepository {
    calculeTypes(team: TeamPokemonsDTO): void;
    calcWeakness(pokemons: PokemonsDTO[]): number[];
    calcResistence(pokemons: PokemonsDTO[]): number[];
    createTeam(data: CreateTeamDTO): Promise<Team>;
    deleteTeam(data: Team): Promise<void>;
}
