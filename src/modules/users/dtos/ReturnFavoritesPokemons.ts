export default interface ReturnFavoritesPokemons {
  pokemon_id: number;
  name: string;
  imageUrl: string;
  types: Array<{
    name: string;
  }>;
  id: string;
}
