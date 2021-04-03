import User from '@modules/users/infra/typeorm/entities/User';

export default interface CreateTeamDTO {
  name: string;
  image: string;
  user_id: string;
}
