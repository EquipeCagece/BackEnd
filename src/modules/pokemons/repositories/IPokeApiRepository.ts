import PokemonDTO, { TypePokemonFormatted } from '../dtos/PokemonDTO';
import PokemonsDTO from '../dtos/PokemonsDTO';
import EvolutionDTO from '../dtos/EvolutionDTO';
import PokeApiDTO, { Type } from '../dtos/PokeApiDTO';

export default interface PokemonsRepository {
  // getPokemonByFilter(type: string): Promise<PokemonDTO[]>;
  getPokemonStatsByName(name: string): Promise<PokemonDTO>;
  getEvolutionsPokemon(id: string): Promise<EvolutionDTO>;
  getPokemons(offset: number, limit: number): Promise<PokemonsDTO[]>;
  searchPokemonByName(name: string): Promise<PokemonsDTO>;
  getPokemonImage(id: string): string;
  getPokemonIdByUrl(url: string): string;
  getPokemonData(id: string): Promise<PokeApiDTO>;
  getTypesPokemon(type: Type[]): TypePokemonFormatted[];
}
