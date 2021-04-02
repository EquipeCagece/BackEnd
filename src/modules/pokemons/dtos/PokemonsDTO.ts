export default interface PokemonsDTO {
  id: number;
  name: string;
  imageUrl: string;
  types: Array<{
    name: string;
  }>;
}
