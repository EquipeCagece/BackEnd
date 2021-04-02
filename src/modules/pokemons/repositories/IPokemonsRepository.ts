import PokemonDTO from '../dtos/PokemonDTO';
import PokemonsDTO from '../dtos/PokemonsDTO';
import EvolutionDTO from '../dtos/EvolutionDTO';

export default interface PokemonsRepository {
  // getPokemonByFilter(type: string): Promise<PokemonDTO[]>;
  getPokemonStatsByName(name: string): Promise<PokemonDTO>;
  getEvolutionsPokemon(id: string): Promise<EvolutionDTO>;
  getPokemons(offset: number, limit: number): Promise<PokemonsDTO[]>;
  getPokemonImage(id: string): string;
  getPokemonIdByUrl(url: string): string;
}
