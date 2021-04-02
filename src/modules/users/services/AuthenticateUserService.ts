import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import Favorite from '../infra/typeorm/entities/Favorite';

import IUsersRepository from '../repositories/IUsersRepository';

import IFavoritesRepository from '../repositories/IFavoritesRepository';

import IHashProvider from '../providers/HashProvider/models/HashProvider';

interface Request {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,
  ) {}

  public async execute({
    email,
    password,
  }: Request): Promise<{ user: User; token: string; favorites: Favorite[] }> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const favorites = await this.favoritesRepository.findFavoritesByUserId(
      user.id,
    );

    const passwordMethod = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMethod) {
      throw new AppError('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
      favorites,
    };
  }
}

export default AuthenticateUserService;
