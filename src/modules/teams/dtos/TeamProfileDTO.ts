import Team from '../infra/typeorm/entities/Team';
import CalculateTypesDTO from './CalculateTypesDTO';

export default interface TeamProfileDTO {
  team: Team;
  typeWeakResist: CalculateTypesDTO;
}
