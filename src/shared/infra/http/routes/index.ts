import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import evolutionsRouter from '@modules/pokemons/infra/http/routes/pokemons.routes';
import favoritesRouter from '@modules/users/infra/http/routes/favorites.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/pokemon', evolutionsRouter);
routes.use('/favorites', favoritesRouter);

export default routes;
