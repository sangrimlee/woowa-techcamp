import { Router as router } from 'express';
import { exceptionHandler } from '../middlewares/exception-handler.middleware';
import categoryRouter from './category.router';
import paymentMethodRouter from './payment-method.router';
import transactionHistoryRouter from './transaction-history.router';

const apiRouter = router();

apiRouter.use('/category', categoryRouter);

apiRouter.use('/payment-method', paymentMethodRouter);

apiRouter.use('/transaction-history', transactionHistoryRouter);

apiRouter.use(exceptionHandler);

export default apiRouter;
