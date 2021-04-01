import PokemonDTO from '../dtos/PokemonDTO';
import EvolutionDTO from '../dtos/EvolutionDTO';

export default interface PokemonsRepository {
  getPokemonByFilter(type: string): Promise<PokemonDTO[]>;
  getPokemonByName(name: string): Promise<PokemonDTO>;
  getEvolutionsPokemon(id: number): Promise<EvolutionDTO[]>;
  // getPokemons(): Promise<PokemonDTO[]>;
}
