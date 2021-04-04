import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import PokemonsTeamsController from '../controllers/PokemonsTeamsController';

const pokemonsTeamsRouter = Router();
const pokemonsTeamsController = new PokemonsTeamsController();

pokemonsTeamsRouter.use(ensureAuthenticated);

pokemonsTeamsRouter.put('/', pokemonsTeamsController.updated);

export default pokemonsTeamsRouter;
