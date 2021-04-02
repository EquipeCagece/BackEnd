import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IPokemonsRepository from '@modules/pokemons/repositories/IPokemonsRepository';
import PokemonsRepository from '@modules/pokemons/infra/pokeapi/repositories/PokemonsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPokemonsRepository>(
  'PokemonsRepository',
  PokemonsRepository,
);
