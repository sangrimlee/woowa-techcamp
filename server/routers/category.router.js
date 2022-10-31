import { Router as router } from 'express';
import categoryController from '../controllers/category.controller';

const categoryRouter = router();

categoryRouter.get('/', categoryController.getAllCategories);

export default categoryRouter;
