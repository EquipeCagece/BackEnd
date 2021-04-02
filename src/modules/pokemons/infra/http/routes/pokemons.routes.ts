import { Router } from 'express';

// eslint-disable-next-line import/no-unresolved
import GetEvolutionsControllers from '../controllers/getEvolutionsControllers';

const profileRouter = Router();
const getEvolutionsControllers = new GetEvolutionsControllers();

profileRouter.get('/', getEvolutionsControllers.index);

export default profileRouter;
