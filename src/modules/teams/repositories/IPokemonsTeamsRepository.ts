import PokemonTeam from '../infra/typeorm/entities/PokemonTeam';

import PokemonsTeamDTO from '../dtos/PokemonsTeamDTO';

export default interface IPokemonsTeamsRepository {
  addPokemonToTeam(pokemon: PokemonsTeamDTO): Promise<PokemonTeam>;
  getPokemonsByTeamId(id: string): Promise<PokemonTeam[]>;
}
