import { inject } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';

import ITeamRepository from '@modules/teams/repositories/ITeamRepository';

import PokemonsDTO from '@modules/pokemons/dtos/PokemonsDTO';
import CreateTeamDTO from '@modules/teams/dtos/CreateTeamDTO';
import TeamPokemonsDTO from '@modules/teams/dtos/TeamPokemonsDTO';
import CalculateTypesDTO from '@modules/teams/dtos/CalculateTypesDTO';
import TeamProfileDTO from '@modules/teams/dtos/TeamProfileDTO';

import IPokemonsRepository from '@modules/pokemons/repositories/IPokemonsRepository';

import { typeNames } from '@modules/pokemons/infra/pokemon/utils/boardTypes';

import Team from '../entities/Team';
import PokeTeam from '../entities/Team'
import PokemonTeam from '../entities/PokemonTeam';

class TeamRepository implements ITeamRepository {
  private ormRepository: Repository<Team>;

  constructor(
    @inject('PokemonsRepository')
    private pokemonsRepository: IPokemonsRepository,
  ) {
    this.ormRepository = getRepository(Team);
  }

  public async getTeamProfile(id: string): Promise<TeamProfileDTO> {
    const team = await this.ormRepository.findOneOrFail(id);
    
    const types = this.calculeTypes(team);
    return {
      team,
      typeWeakResist: types
    };
  }

  public async createTeam(data: CreateTeamDTO): Promise<Team> {
    const teamCreated = this.ormRepository.create(data);

    await this.ormRepository.save(teamCreated);

    return teamCreated;
  }

  public async deleteTeam(data: Team): Promise<void> {
    await this.ormRepository.remove(data);
  }

  public calculeTypes(team: Team): CalculateTypesDTO {
    const allWeaknesses = this.calcWeakness(team.pokemons);
    const allResistances = this.calcWeakness(team.pokemons);

    for (let i = 0; i < allWeaknesses.length; i += 1) {
      if (allResistances.includes(allWeaknesses[i])) {
        // Se encontrou a fraqueza na lista de resistências, então remove das duas listas (a lista terá um tamanho
        // menor, logo diminui o i)
        const index = allResistances.findIndex(
          callback => callback === allWeaknesses[i],
        );
        allResistances.splice(index, 1);
        allWeaknesses.splice(i, 1);
        i -= 1;
      }
    }
    allWeaknesses.sort();
    allResistances.sort();

    // Passa os tipos guardados em inteiros para strings
    const allWeaknessesStr = allWeaknesses.map((_, index) => {
      return typeNames[index];
    });

    const allResistenceStr = allResistances.map((_, index) => {
      return typeNames[index];
    });

    return {
      allWeaknesses: allWeaknessesStr,
      allResistence: allResistenceStr,
    };
  }

  public calcWeakness(pokemons: PokemonTeam[]): number[] {
    let allWeaknesses: number[] = [];

    // Para cada pokemon, será calculado sua fraqueza
    pokemons.forEach(pokemon => {
      const type1 = pokemon.type1;

      let type2 = 'none';
      // Se o pokemon possuir um segundo tipo, salva
      if (pokemon.type2 !== undefined && pokemon.type2.length !== 0) 
        type2 = pokemon.type2;

      const vectorAux = this.pokemonsRepository.calcWeakness(type1, type2);
      allWeaknesses = [...vectorAux];
    });

    return allWeaknesses;
  }

  public calcResistence(pokemons: PokemonTeam[]): number[] {
    let allResistances: number[] = [];

    // Para cada pokemon, será calculado sua fraqueza
    pokemons.forEach(pokemon => {
      const type1 = pokemon.type1;

      let type2 = 'none';
      // Se o pokemon possuir um segundo tipo, salva
      if (pokemon.type2 !== undefined && pokemon.type2.length !== 0) 
        type2 = pokemon.type2;

      const vectorAux = this.pokemonsRepository.calcResistence(type1, type2);
      allResistances = [...vectorAux];
    });

    return allResistances;
  }
}

export default TeamRepository;
