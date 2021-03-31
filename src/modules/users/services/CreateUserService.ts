import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

import IHashProvider from '../providers/HashProvider/models/HashProvider';

interface Request {
  name: string;
  email: string;
  userName: string;
  lastName: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    userName,
    lastName,
    password,
  }: Request): Promise<User> {
    function validateEmail(): boolean {
      const re = new RegExp(
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
      return re.test(String(email).toLowerCase());
    }
    const checkUserExists = await this.usersRepository.findByEmail(email);

    const checkValidEmail = validateEmail();

    if (!checkValidEmail) {
      throw new AppError('Invalid email address.');
    }

    if (checkUserExists) {
      throw new AppError('Email address already used!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const data = {
      name,
      email,
      userName,
      lastName,
      password: hashedPassword,
    };

    const user = this.usersRepository.create(data);

    return user;
  }
}

export default CreateUserService;
