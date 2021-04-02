import { Router } from 'express';

import FavoritesController from '../controllers/FavoritesController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const favoritesRouter = Router();
const favoritesController = new FavoritesController();

favoritesRouter.use(ensureAuthenticated);

favoritesRouter.post('/create', favoritesController.create);

favoritesRouter.delete('/delete', favoritesController.delete);

export default favoritesRouter;
