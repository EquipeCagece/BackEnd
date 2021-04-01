import IPokemonsRepository from '@modules/pokemons/repositories/IPokemonsRepository';

import PokeApiDTO from '@modules/pokemons/dtos/PokeApiDTO';
import PokeApiSpecieDTO from '@modules/pokemons/dtos/PokeApiSpecieDTO';
import PokeApiEvolutionDTO from '@modules/pokemons/dtos/PokeApiEvolutionDTO';

import PokemonDTO from '@modules/pokemons/dtos/PokemonDTO';
import EvolutionDTO from '@modules/pokemons/dtos/EvolutionDTO';

import pokeApi from '../utils/pokeApi';
import getPokemonImageById from '../utils/getPokemonImageById';

class PokemonsRepository implements IPokemonsRepository {
  async getPokemonByName(name: string): Promise<PokemonDTO> {
    const { data: pokemon } = await pokeApi.get<PokeApiDTO>(`/pokemon/${name}`);

    const pokemonTypesFormatted = pokemon.types.map(({ type }) => {
      return {
        name: type.name,
      };
    });

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
        baseStatus: stat.baseStat,
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
      imageUrl: getPokemonImageById(String(pokemon.id)),
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemonTypesFormatted,
      stats: pokemonStatsFormatted,
      abilities: pokemonAbilitiesFormatted,
    };

    return data;
  }

  async getEvolutionsPokemon(id: number): Promise<EvolutionDTO[]> {
    const { data: pokemon } = await pokeApi.get<PokeApiDTO>(
      `pokemon-species/${id}`,
    );
    const { data: pokemonSpecie } = await pokeApi.get<PokeApiSpecieDTO>(
      `pokemon-species/${id}`,
    );
    const { data: evolutions } = await pokeApi.get<PokeApiEvolutionDTO>(
      pokemonSpecie.evolutionChain.url,
    );

    // esse baseForm não é a forma base do pokemon
    // const baseForm = {
    //   id: pokemon.id,
    //   name: pokemon.name,
    //   imageUrl: getPokemonImageById(String(pokemon.id)),
    // };

    // retornar em ordem as evoluções caso tenha
  }
}

export default PokemonsRepository;
