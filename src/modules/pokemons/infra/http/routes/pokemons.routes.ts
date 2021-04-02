import { Router } from 'express';

import EvolutionsController from '../controllers/EvolutionsController';
import PokemonStatsController from '../controllers/PokemonStatsController';
import PokemonsController from '../controllers/PokemonsController';

const profileRouter = Router();
const evolutionsController = new EvolutionsController();
const pokemonStatsController = new PokemonStatsController();
const pokemonsController = new PokemonsController();

profileRouter.get('/evolutions', evolutionsController.index);
profileRouter.get('/stats', pokemonStatsController.show);
profileRouter.get('/', pokemonsController.index);
profileRouter.get('/search', pokemonsController.show);

export default profileRouter;
