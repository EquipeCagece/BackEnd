import PokemonsDTO from "@modules/pokemons/dtos/PokemonsDTO";
import CreateTeamDTO from "@modules/teams/dtos/CreateTeamDTO";
import ITeamRepository from "@modules/teams/repositories/ITeamRepository";
import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import { getRepository, Repository } from "typeorm";
import Team from "../entites/Team";

class TeamRepository implements ITeamRepository {
    private ormRepository: Repository<Team>;

    constructor() {
      this.ormRepository = getRepository(Team);
    }

    public async createTeam(data: CreateTeamDTO): Promise<Team> {
      const teamCreated = this.ormRepository.create(data);

      await this.ormRepository.save(teamCreated);

      return teamCreated;
    }

    public async deleteTeam(data: Team): Promise<void> {
      await this.ormRepository.remove(data);
    }

    public calculeTypes(team: Team): void {
        //let allWeaknesses = calcWeakness;
        /*List<Integer> allWeaknesses = new ArrayList<Integer>();
		List<Integer> allResistances = new ArrayList<Integer>();

		allWeaknesses = calcWeakness(team.getPokemon());
		allResistances = calcResistence(team.getPokemon());
		allWeaknesses.sort(null);
		allResistances.sort(null);

		for (int i = 0; i < allWeaknesses.size(); ++i) {
			if (allResistances.contains(allWeaknesses.get(i))) {
				// Se encontrou a fraqueza na lista de resistências, então remove das duas listas (a lista terá um tamanho
				// menor, logo diminui o i)
				allResistances.remove(allWeaknesses.get(i));
				allWeaknesses.remove(allWeaknesses.get(i));
				--i;
			}
		}*/
    }

    public calcWeakness(pokemons: PokemonsDTO[]): number[]{
        let allWeaknesses;
        /*List<Integer> allWeaknesses = new ArrayList<Integer>();

		// Para cada pokemon, será calculado sua fraqueza
		for (Pokemon pokemon : pokemons) {
			String type1 = pokemon.getType().get(0);

			String type2 = "none";
			// Se o pokemon possuir um segundo tipo, salva
			if (pokemon.getType().size() == 2)
				type2 = pokemon.getType().get(1);

			allWeaknesses.addAll(PokemonDAO.calcWeakness(type1, type2));
		}
		return allWeaknesses;*/
        return allWeaknesses;
    }

    public calcResistence(pokemons: PokemonsDTO[]): number[]{
        let allWeaknesses;

        return allWeaknesses;
    }

    public calcWeaknessPoke(type1: string, type2: string): number[] {
        /**List<Integer> result = new ArrayList<Integer>();
		Map<String, Integer> typesToInt = new HashMap<>();
		typesToInt = typesToInt();
		int type1 = 0, type2 = 0;

		type1 = typesToInt.get(strType1);
		type2 = typesToInt.get(strType2);

		for(int i = 0; i < 18; ++i){
            if(BOARD[type1][i] * BOARD[type2][i] >= 2.0){
                result.add(new Integer(i));
            }
        }
		return result; */
    }
    public calcResistencePoke(type1: string, type2: string): number[] {

    }
}
