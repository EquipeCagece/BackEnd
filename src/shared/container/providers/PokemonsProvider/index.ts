import { container } from 'tsyringe';

import PokeApiProvider from './implementations/PokeApiProvider';

import IPokemonsProvider from './models/IPokemonsProvider';

container.registerSingleton<IPokemonsProvider>(
  'PokemonsProvider',
  PokeApiProvider,
);
