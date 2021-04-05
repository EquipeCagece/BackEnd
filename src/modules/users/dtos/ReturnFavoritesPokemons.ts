export default interface ReturnFavoritesPokemons {
  id: number;
  name: string;
  imageUrl: string;
  types: Array<{
    name: string;
  }>;
}
