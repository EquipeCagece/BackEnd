import { Router } from 'express';

import EvolutionsController from '../controllers/EvolutionsController';
import PokemonStatsController from '../controllers/PokemonStatsController';
import PokemonsController from '../controllers/PokemonsController';
import PokemonsByUrlController from '../controllers/PokemonsByUrlController';

const profileRouter = Router();
const evolutionsController = new EvolutionsController();
const pokemonStatsController = new PokemonStatsController();
const pokemonsController = new PokemonsController();
const pokemonsByUrlController = new PokemonsByUrlController();

profileRouter.get('/evolutions/:name', evolutionsController.index);
profileRouter.get('/stats/:name', pokemonStatsController.show);
profileRouter.get('/', pokemonsController.index);
profileRouter.get('/search/:name', pokemonsController.show);
profileRouter.get('/url', pokemonsByUrlController.index);

export default profileRouter;
