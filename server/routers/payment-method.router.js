import { Router as router } from 'express';
import paymentMethodController from '../controllers/payment-method.controller';

const paymentMethodRouter = router();

paymentMethodRouter.get('/', paymentMethodController.getAllPaymentMethod);

paymentMethodRouter.post('/', paymentMethodController.createPaymentMethod);

paymentMethodRouter.patch('/:id', paymentMethodController.updatePaymentMethod);

paymentMethodRouter.delete('/:id', paymentMethodController.removePaymentMethod);

export default paymentMethodRouter;
