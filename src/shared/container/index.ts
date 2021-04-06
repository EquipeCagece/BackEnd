import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/implementations/UsersRepository';

import IFavoritesRepository from '@modules/users/repositories/IFavoritesRepository';
import FavoritesRepository from '@modules/users/infra/typeorm/implementations/FavoritesRepository';

import ITeamsRepository from '@modules/teams/repositories/ITeamsRepository';
import TeamsRepository from '@modules/teams/infra/typeorm/implementations/TeamsRepository';

import IPokemonsTeamsRepository from '@modules/teams/repositories/IPokemonsTeamsRepository';
import PokemonsTeamsRepository from '@modules/teams/infra/typeorm/implementations/PokemonsTeamsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IFavoritesRepository>(
  'FavoritesRepository',
  FavoritesRepository,
);

container.registerSingleton<ITeamsRepository>(
  'TeamsRepository',
  TeamsRepository,
);

container.registerSingleton<IPokemonsTeamsRepository>(
  'PokemonsTeamsRepository',
  PokemonsTeamsRepository,
);
