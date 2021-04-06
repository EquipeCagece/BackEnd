export default interface EvolutionDTO {
  pokemonBaseForm: {
    id: number;
    name: string;
    imageUrl: string;
  };
  pokemonFirstEvolution?: {
    id: number;
    name: string;
    imageUrl: string;
  };
  pokemonSecondEvolution?: {
    id?: number;
    name?: string;
    imageUrl?: string;
  };
}
