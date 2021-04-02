import PokemonsDTO from "@modules/pokemons/dtos/PokemonsDTO";
import User from "@modules/users/infra/typeorm/entities/User";

export default interface CreateTeamDTO {
    id: number;
    name: string;
    listPokemons: Array<{
        pokemon: PokemonsDTO;
    }>;
    user: User;
}