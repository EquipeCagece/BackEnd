export default interface SearchPokemonDTO {
  id: number;
  name: string;
  imageUrl: string;
  types: Array<{
    name: string;
  }>;
}
