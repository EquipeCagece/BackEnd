import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/HashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
