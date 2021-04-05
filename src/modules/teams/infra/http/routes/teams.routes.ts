import multer from 'multer';

import { Router } from 'express';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import TeamsController from '../controllers/TeamsController';

const teamRouter = Router();
const upload = multer(uploadConfig.multer);
const teamsController = new TeamsController();

teamRouter.use(ensureAuthenticated);

teamRouter.post('/', upload.single('image'), teamsController.create);
teamRouter.get('/team/:id', teamsController.show);
teamRouter.get('/', teamsController.index);
teamRouter.delete('/', teamsController.delete);

export default teamRouter;
