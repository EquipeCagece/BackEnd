export default interface PokemonDTO {
  id: number;
  name: string;
  imageUrl: string;
  height: number;
  weight: number;
  types: Array<{
    name: string;
  }>;
  stats: Array<{
    baseStatus: number;
    name: string;
  }>;
  abilities: Array<{
    name: string;
  }>;
}

export interface TypePokemonFormatted {
  name: string;
}
