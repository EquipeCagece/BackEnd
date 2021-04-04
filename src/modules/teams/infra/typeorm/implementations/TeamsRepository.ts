import { getRepository, Repository } from 'typeorm';

import ITeamsRepository from '@modules/teams/repositories/ITeamsRepository';

import CreateTeamDTO from '@modules/teams/dtos/CreateTeamDTO';
import CalculateTypesDTO from '@modules/teams/dtos/CalculateTypesDTO';
import TeamProfileDTO from '@modules/teams/dtos/TeamProfileDTO';

import IPokemonsRepository from '@modules/pokemons/repositories/IPokemonsRepository';
import PokemonsRepository from '@modules/pokemons/infra/pokemon/implementations/PokemonsRepository';

import { typeNames } from '@modules/pokemons/infra/pokemon/utils/boardTypes';

import Team from '../entities/Team';
import PokemonTeam from '../entities/PokemonTeam';

class TeamsRepository implements ITeamsRepository {
  private ormRepository: Repository<Team>;

  private pokemonsRepository: IPokemonsRepository;

  constructor() {
    this.ormRepository = getRepository(Team);
    this.pokemonsRepository = new PokemonsRepository();
  }

  public async getTeamsByUserId(user_id: string): Promise<Team[]> {
    const teams = await this.ormRepository.find({
      where: { user_id },
      relations: ['pokemons'],
    });

    return teams;
  }

  public async getTeamProfile(id: string): Promise<TeamProfileDTO> {
    const team = await this.ormRepository.findOneOrFail(id, {
      relations: ['pokemons'],
    });

    const types = this.calculeTypes(team);
    return {
      team,
      typeWeakResist: types,
    };
  }

  public async createTeam(data: CreateTeamDTO): Promise<Team> {
    const teamCreated = this.ormRepository.create(data);

    await this.ormRepository.save(teamCreated);

    return teamCreated;
  }

  public async deleteTeam(id: string): Promise<void> {
    const team = await this.ormRepository.findOneOrFail(id);

    await this.ormRepository.remove(team);
  }

  public calculeTypes(team: Team): CalculateTypesDTO {
    const allWeaknesses = this.calcWeakness(team.pokemons);
    const allResistances = this.calcResistence(team.pokemons);

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
    const allWeaknessesStr = allWeaknesses.map(value => {
      return typeNames[value];
    });

    const allResistenceStr = allResistances.map(value => {
      return typeNames[value];
    });

    return {
      allWeaknesses: allWeaknessesStr,
      allResistence: allResistenceStr,
    };
  }

  public calcWeakness(pokemons: PokemonTeam[]): number[] {
    const allWeaknesses: number[] = [];

    // Para cada pokemon, será calculado sua fraqueza
    pokemons.forEach(pokemon => {
      const { type1 } = pokemon;

      let type2 = 'none';
      // Se o pokemon possuir um segundo tipo, salva
      if (pokemon.type2 !== null) type2 = pokemon.type2;

      const vectorAux = this.pokemonsRepository.calcWeakness(type1, type2);
      allWeaknesses.push(...vectorAux);
    });

    return allWeaknesses;
  }

  public calcResistence(pokemons: PokemonTeam[]): number[] {
    const allResistances: number[] = [];

    // Para cada pokemon, será calculado sua fraqueza
    pokemons.forEach(pokemon => {
      const { type1 } = pokemon;

      let type2 = 'none';
      // Se o pokemon possuir um segundo tipo, salva
      if (pokemon.type2 !== null) type2 = pokemon.type2;

      const vectorAux = this.pokemonsRepository.calcResistence(type1, type2);
      allResistances.push(...vectorAux);
    });

    return allResistances;
  }
}

export default TeamsRepository;
