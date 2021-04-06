import PokemonDTO, { TypePokemonFormatted } from '../dtos/PokemonDTO';
import PokemonsDTO from '../dtos/PokemonsDTO';
import SearchPokemonDTO from '../dtos/SearchPokemonDTO';
import EvolutionDTO from '../dtos/EvolutionDTO';
import PokeApiDTO, { Type } from '../dtos/PokeApiDTO';

export default interface IPokemonsProvider {
  getPokemonStatsByName(name: string): Promise<PokemonDTO>;
  getEvolutionsPokemon(id: string): Promise<EvolutionDTO>;
  getPokemons(offset: number, limit: number): Promise<PokemonsDTO>;
  getPokemonsByUrl(url: string): Promise<PokemonsDTO>;
  searchPokemonByName(name: string): Promise<SearchPokemonDTO>;
  getPokemonImage(id: string): string;
  getPokemonIdByUrl(url: string): string;
  getPokemonData(id: string): Promise<PokeApiDTO>;
  getTypesPokemon(type: Type[]): TypePokemonFormatted[];
  capitalizeFirstLetter(name: string): string;
}
