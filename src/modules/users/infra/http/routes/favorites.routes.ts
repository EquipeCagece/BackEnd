import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import FavoritesController from '../controllers/FavoritesController';

const favoritesRouter = Router();
const favoritesController = new FavoritesController();

favoritesRouter.use(ensureAuthenticated);

favoritesRouter.get('/', favoritesController.index);

favoritesRouter.post('/create', favoritesController.create);

favoritesRouter.delete('/delete', favoritesController.delete);

export default favoritesRouter;
