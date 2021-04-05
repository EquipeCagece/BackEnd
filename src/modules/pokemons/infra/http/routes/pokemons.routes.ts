import { Router } from 'express';

import EvolutionsController from '../controllers/EvolutionsController';
import PokemonStatsController from '../controllers/PokemonStatsController';
import PokemonsController from '../controllers/PokemonsController';

const profileRouter = Router();
const evolutionsController = new EvolutionsController();
const pokemonStatsController = new PokemonStatsController();
const pokemonsController = new PokemonsController();

profileRouter.get('/evolutions/:name', evolutionsController.index);
profileRouter.get('/stats/:name', pokemonStatsController.show);
profileRouter.get('/', pokemonsController.index);
profileRouter.get('/search/:name', pokemonsController.show);

export default profileRouter;
