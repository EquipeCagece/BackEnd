import PokemonsDTO from "@modules/pokemons/dtos/PokemonsDTO";
import Team from "../infra/typeorm/entites/Team";

export default interface ITeamRepository {
    calculeTypes(team: Team): void;
    calcWeakness(pokemons: PokemonsDTO[]): number[];
    calcResistence(pokemons: PokemonsDTO[]): number[];
    calcWeaknessPoke(type1: string, type2: string): number[];
    calcResistencePoke(type1: string, type2: string): number[];
}