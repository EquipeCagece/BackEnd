import PokeApiDTO, { Type } from '../dtos/PokeApiDTO';
import PokeApiSpecieDTO from '../dtos/PokeApiSpecieDTO';
import PokeApiEvolutionDTO from '../dtos/PokeApiEvolutionDTO';
import PokeApiResultDTO from '../dtos/PokeApiResultDTO';

import PokemonDTO, { TypePokemonFormatted } from '../dtos/PokemonDTO';
import PokemonsDTO from '../dtos/PokemonsDTO';
import SearchPokemonDTO from '../dtos/SearchPokemonDTO';
import EvolutionDTO from '../dtos/EvolutionDTO';

import IPokemonsProvider from '../models/IPokemonsProvider';

import pokeApi from '../utils/pokeApi';

class PokeApiProvider implements IPokemonsProvider {
  public capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  public async getPokemonStatsByName(name: string): Promise<PokemonDTO> {
    const pokemon = await this.getPokemonData(name);

    const pokemonTypesFormatted = this.getTypesPokemon(pokemon.types);

    const pokemonStatsFormatted = pokemon.stats.map(stat => {
      let nameStat = '';

      if (stat.stat.name === 'hp') {
        nameStat = 'HP';
      } else if (stat.stat.name === 'attack') {
        nameStat = 'Ataque';
      } else if (stat.stat.name === 'defense') {
        nameStat = 'Defesa';
      } else if (stat.stat.name === 'special-attack') {
        nameStat = 'Ataque especial';
      } else if (stat.stat.name === 'special-defense') {
        nameStat = 'Defesa especial';
      } else if (stat.stat.name === 'speed') {
        nameStat = 'Velocidade';
      }

      return {
        baseStatus: stat.base_stat,
        name: nameStat,
      };
    });

    const pokemonAbilitiesFormatted = pokemon.abilities.map(ability => {
      return {
        name: ability.ability.name,
      };
    });

    const data = {
      id: pokemon.id,
      name: pokemon.name,
      imageUrl: this.getPokemonImage(String(pokemon.id)),
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemonTypesFormatted,
      stats: pokemonStatsFormatted,
      abilities: pokemonAbilitiesFormatted,
    };

    return data;
  }

  public async getEvolutionsPokemon(id: string): Promise<EvolutionDTO> {
    const { data: pokemonSpecie } = await pokeApi.get<PokeApiSpecieDTO>(
      `pokemon-species/${id}`,
    );

    const pokemonIdInEvolutionChain = this.getPokemonIdByUrl(
      pokemonSpecie.evolution_chain.url,
    );

    const { data: evolutions } = await pokeApi.get<PokeApiEvolutionDTO>(
      `/evolution-chain/${pokemonIdInEvolutionChain}`,
    );

    if (evolutions.chain.evolves_to.length === 0) {
      const pokemon = await this.getPokemonData(evolutions.chain.species.name);
      return {
        pokemonBaseForm: {
          id: pokemon.id,
          name: evolutions.chain.species.name,
          imageUrl: this.getPokemonImage(String(pokemon.id)),
        },
      };
    }

    const evolutionsFormatted = evolutions.chain.evolves_to.map(evolves => {
      const { name: baseFormName, url: baseFormUrl } = evolutions.chain.species;

      const idBaseForm = this.getPokemonIdByUrl(baseFormUrl);

      const pokemonBaseForm = {
        id: Number(idBaseForm),
        name: baseFormName,
        imageUrl: this.getPokemonImage(String(idBaseForm)),
      };

      const firstEvolutionPokemonId = this.getPokemonIdByUrl(
        evolves.species.url,
      );

      const pokemonFirstEvolution = {
        id: Number(firstEvolutionPokemonId),
        name: evolves.species.name,
        imageUrl: this.getPokemonImage(firstEvolutionPokemonId),
      };

      let pokemonSecondEvolution;

      if (evolves.evolves_to.length !== 0) {
        evolves.evolves_to.map(secondEvolves => {
          const secondEvolutionPokemonId = this.getPokemonIdByUrl(
            secondEvolves.species.url,
          );

          pokemonSecondEvolution = {
            id: Number(secondEvolutionPokemonId),
            name: secondEvolves.species.name,
            imageUrl: this.getPokemonImage(secondEvolutionPokemonId),
          };

          return pokemonSecondEvolution;
        });
      } else {
        pokemonSecondEvolution = {
          id: undefined,
          name: undefined,
          imageUrl: undefined,
        };
      }

      return {
        pokemonBaseForm,
        pokemonFirstEvolution,
        pokemonSecondEvolution,
      };
    });

    const pokemonBaseForm = evolutionsFormatted.map(evolution => ({
      id: evolution.pokemonBaseForm.id,
      name: evolution.pokemonBaseForm.name,
      imageUrl: evolution.pokemonBaseForm.imageUrl,
    }))[0];

    const pokemonFirstEvolution = evolutionsFormatted.map(evolution => ({
      id: evolution.pokemonFirstEvolution.id,
      name: evolution.pokemonFirstEvolution.name,
      imageUrl: evolution.pokemonFirstEvolution.imageUrl,
    }))[0];

    const pokemonSecondEvolution = evolutionsFormatted.map(evolution => ({
      id: evolution.pokemonSecondEvolution?.id,
      name: evolution.pokemonSecondEvolution?.name,
      imageUrl: evolution.pokemonSecondEvolution?.imageUrl,
    }))[0];

    const pokemonsEvolutions = {
      pokemonBaseForm,
      pokemonFirstEvolution,
      pokemonSecondEvolution,
    };

    return pokemonsEvolutions;
  }

  public async getPokemonsByUrl(url: string): Promise<PokemonsDTO> {
    const response = await pokeApi.get<PokeApiResultDTO>(url);

    const { results, next, previous } = response.data;

    const pokemons = results.map(async pokemon => {
      const pokemonId = this.getPokemonIdByUrl(pokemon.url);

      const pokemonData = await this.getPokemonData(pokemonId);

      const types = pokemonData.types.map(({ type }) => {
        return {
          name: type.name,
        };
      });

      return {
        id: pokemonData.id,
        name: pokemonData.name,
        imageUrl: this.getPokemonImage(pokemonId),
        types,
      };
    });

    return {
      pokemons: await Promise.all(pokemons),
      nextPage: next,
      previousPage: previous,
    };
  }

  public async getPokemons(
    offset: number,
    limit: number,
  ): Promise<PokemonsDTO> {
    const response = await pokeApi.get<PokeApiResultDTO>('/pokemon', {
      params: {
        offset: offset || 0,
        limit: limit || 10,
      },
    });

    const { results, next, previous } = response.data;

    const pokemons = results.map(async pokemon => {
      const pokemonId = this.getPokemonIdByUrl(pokemon.url);

      const pokemonData = await this.getPokemonData(pokemonId);

      const types = pokemonData.types.map(({ type }) => {
        return {
          name: type.name,
        };
      });

      return {
        id: pokemonData.id,
        name: pokemonData.name,
        imageUrl: this.getPokemonImage(pokemonId),
        types,
      };
    });

    return {
      pokemons: await Promise.all(pokemons),
      nextPage: next,
      previousPage: previous,
    };
  }

  public async searchPokemonByName(name: string): Promise<SearchPokemonDTO> {
    const pokemonData = await this.getPokemonData(name);

    return {
      id: pokemonData.id,
      name: pokemonData.name,
      imageUrl: this.getPokemonImage(String(pokemonData.id)),
      types: this.getTypesPokemon(pokemonData.types),
    };
  }

  public getPokemonImage(id: string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  public getPokemonIdByUrl = (url: string): string => url.split('/')[6];

  public async getPokemonData(id: string): Promise<PokeApiDTO> {
    const { data: pokemon } = await pokeApi.get<PokeApiDTO>(`/pokemon/${id}`);

    return pokemon;
  }

  public getTypesPokemon(type: Type[]): TypePokemonFormatted[] {
    const types = type.map(({ type: typeFormatted }) => {
      return {
        name: typeFormatted.name,
      };
    });

    return types;
  }
}

export default PokeApiProvider;
