export default interface PokeApiEvolutionDTO {
  babyTriggerItem: null;
  chain: Chain;
  id: number;
}

export interface Chain {
  evolutionDetails: EvolutionDetail[];
  evolvesTo: Chain[];
  isBaby: boolean;
  species: Species;
}

export interface EvolutionDetail {
  gender: null;
  heldItem: null;
  item: Species | null;
  knownMove: null;
  knownMoveType: null;
  location: null;
  minAffection: null;
  minBeauty: null;
  minHappiness: number | null;
  minLevel: null;
  needsOverworldRain: boolean;
  partySpecies: null;
  partyType: null;
  relativePhysicalStats: null;
  timeOfDay: string;
  tradeSpecies: null;
  trigger: Species;
  turnUpsideDown: boolean;
}

export interface Species {
  name: string;
  url: string;
}
