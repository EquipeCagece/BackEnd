import PokemonsDTO from "@modules/pokemons/dtos/PokemonsDTO";
import CreateTeamDTO from "@modules/teams/dtos/CreateTeamDTO";
import ITeamRepository from "@modules/teams/repositories/ITeamRepository";
import { getRepository, Repository } from "typeorm";
import Team from "../entites/Team";

import PokemonsRepository from '@modules/pokemons/infra/pokeapi/repositories/PokemonsRepository'
import IPokemonsRepository from "@modules/pokemons/repositories/IPokemonsRepository";

import { typeNames } from '@modules/pokemons/infra/pokeapi/utils/boardTypes';
import TeamPokemonsDTO from "@modules/teams/dtos/TeamPokemonsDTO";

class TeamRepository implements ITeamRepository {
    private ormRepository: Repository<Team>;
	private pokemonsRepository: IPokemonsRepository;

    constructor() {
      this.ormRepository = getRepository(Team);
	  this.pokemonsRepository = new PokemonsRepository();
    }

    public async createTeam(data: CreateTeamDTO): Promise<Team> {
      const teamCreated = this.ormRepository.create(data);

      await this.ormRepository.save(teamCreated);

      return teamCreated;
    }

    public async deleteTeam(data: Team): Promise<void> {
      await this.ormRepository.remove(data);
    }

    public calculeTypes(team: TeamPokemonsDTO): void {
        let allWeaknesses = this.calcWeakness(team.pokemons);
		let allResistances = this.calcWeakness(team.pokemons);
						
		for (let i = 0; i < allWeaknesses.length; ++i) {
			if (allResistances.includes(allWeaknesses[i])) {
				// Se encontrou a fraqueza na lista de resistências, então remove das duas listas (a lista terá um tamanho
				// menor, logo diminui o i)
				const index = allResistances.findIndex(callback => callback == allWeaknesses[i])
				allResistances.splice(index, 1);
				allWeaknesses.splice(i, 1);
				--i;
			}
		}
		allWeaknesses.sort;
		allResistances.sort;

		let allWeaknessesStr, allResistenceStr; 

		// Passa os tipos guardados em inteiros para strings
		allWeaknesses.forEach (index => {
			allWeaknessesStr.push(typeNames[index]);
		});

		allResistances.forEach (index => {
			allResistenceStr.push(typeNames[index]);
		});

		//retorno = allWeaknessesStr e allResistenceStr
    }
	
	public calcWeakness(pokemons: PokemonsDTO[]): number[]{
        let allWeaknesses: number[] = [];

		// Para cada pokemon, será calculado sua fraqueza
		pokemons.forEach (pokemon => {
			let type1 = pokemon.types[0].name;
			
			let type2 = "none";
			// Se o pokemon possuir um segundo tipo, salva
			if (pokemon.types.length === 2)
				type2 = pokemon.types[1].name;
			
			const vectorAux = this.pokemonsRepository.calcWeakness(type1, type2);
			allWeaknesses = [...vectorAux];
		})
			
        return allWeaknesses;
    }
    
    public calcResistence(pokemons: PokemonsDTO[]): number[]{
        let allResistances: number[] = [];

		// Para cada pokemon, será calculado sua fraqueza
		pokemons.forEach (pokemon => {
			let type1 = pokemon.types[0].name;
			
			let type2 = "none";
			// Se o pokemon possuir um segundo tipo, salva
			if (pokemon.types.length === 2)
				type2 = pokemon.types[1].name;
			
			const vectorAux = this.pokemonsRepository.calcResistence(type1, type2);
			allResistances = [...vectorAux];
		})
			
        return allResistances;
    }
}
