export default interface IPokemonProvider {
  calcWeakness(strType1: string, strType2: string): number[];
  calcResistence(strType1: string, strType2: string): number[];
}
