import User from '../infra/typeorm/entities/User';

export default interface FavoritesPokemonsDTO {
  pokemon_id: number;
  user: User;
}
