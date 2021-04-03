export default interface PokemonsRepository {
  calcWeakness(strType1: string, strType2: string): number[];
  calcResistence(strType1: string, strType2: string): number[];
}
