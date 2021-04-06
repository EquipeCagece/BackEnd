import IPokemonProvider from '../models/IPokemonProvider';

import { BOARD, typesToInt } from '../utils/boardTypes';

class PokemonProvider implements IPokemonProvider {
  public calcWeakness(strType1: string, strType2: string): number[] {
    const result: number[] = [];

    let type1 = typesToInt.get(strType1);
    let type2 = typesToInt.get(strType2);

    if (type1 === undefined) {
      type1 = 0;
    }
    if (type2 === undefined) {
      type2 = 0;
    }

    for (let i = 0; i < 18; i += 1) {
      if (BOARD[type1][i] * BOARD[type2][i] >= 2.0) {
        result.push(i);
      }
    }
    return result;
  }

  public calcResistence(strType1: string, strType2: string): number[] {
    const result: number[] = [];

    let type1 =
      typesToInt.get(strType1) === undefined ? 0 : typesToInt.get(strType1);
    let type2 = typesToInt.get(strType2);

    if (type1 === undefined) {
      type1 = 0;
    }
    if (type2 === undefined) {
      type2 = 0;
    }

    for (let i = 0; i < 18; i += 1) {
      if (BOARD[type1][i] * BOARD[type2][i] <= 0.5) {
        result.push(i);
      }
    }
    return result;
  }
}

export default PokemonProvider;
