import { container } from 'tsyringe';

import DiskStorageProvider from './implementations/DiskStorageProvider';

import IStorageProvider from './models/StorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
