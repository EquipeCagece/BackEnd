import SearchPokemonDTO from './SearchPokemonDTO';

export default interface PokemonsDTO {
  pokemons: SearchPokemonDTO[];
  nextPage?: string | null;
  previousPage?: string | null;
}
