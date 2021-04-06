import { container } from 'tsyringe';

import PokemonProvider from './implementations/PokemonProvider';

import IPokemonProvider from './models/IPokemonProvider';

container.registerSingleton<IPokemonProvider>(
  'PokemonProvider',
  PokemonProvider,
);
