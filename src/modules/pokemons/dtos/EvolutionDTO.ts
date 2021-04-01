export default interface EvolutionDTO {
  id: number;
  name: string;
  imageUrl: string;
  types: Array<{
    name: string;
  }>;
}
