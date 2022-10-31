import { Router as router } from 'express';
import transactionHistoryController from '../controllers/transaction-history.controller';

const transactionHistoryRouter = router();

transactionHistoryRouter.get(
  '/',
  transactionHistoryController.getTranscationHistoriesByMonth,
);

transactionHistoryRouter.get(
  '/category',
  transactionHistoryController.getTotalSpentByCategory,
);

transactionHistoryRouter.post(
  '/',
  transactionHistoryController.createTransactionHistory,
);

transactionHistoryRouter.patch(
  '/:id',
  transactionHistoryController.updateTransactionHistory,
);

transactionHistoryRouter.delete(
  '/:id',
  transactionHistoryController.removeTransactionHistroy,
);

export default transactionHistoryRouter;
