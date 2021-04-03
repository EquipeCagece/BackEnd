import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CalculateTypesDTO from '../dtos/CalculateTypesDTO';

interface Request {
  user_id: string;
  name: string;
  image: string;
}

@injectable()
class CreateTeamService {
  constructor() {}

  public async execute({
    user_id,
    name,
    image,
  }: Request): Promise<CalculateTypesDTO> {}
}

export default CreateTeamService;
