import { STATUS_CODE } from '../constants/status-code.constant';
import paymentMethodService from '../services/payment-method.service';

const paymentMethodController = {
  async getAllPaymentMethod(req, res, next) {
    try {
      const paymentMethods = await paymentMethodService.getAllPaymentMethods();
      res.status(STATUS_CODE.OK).json({
        statusCode: STATUS_CODE.OK,
        data: paymentMethods,
      });
    } catch (error) {
      next(error);
    }
  },

  async createPaymentMethod(req, res, next) {
    try {
      const createPaymentMethodDto = req.body;
      const paymentMethod = await paymentMethodService.createPaymentMethod(
        createPaymentMethodDto,
      );
      res.status(STATUS_CODE.CREATED).json({
        statusCode: STATUS_CODE.CREATED,
        data: paymentMethod,
      });
    } catch (error) {
      next(error);
    }
  },

  async updatePaymentMethod(req, res, next) {
    try {
      const { id: paymentMethodId } = req.params;
      const updatePaymentMethodDto = req.body;
      const paymentMethod = await paymentMethodService.updatePaymentMethod(
        paymentMethodId,
        updatePaymentMethodDto,
      );
      res.status(STATUS_CODE.OK).json({
        statusCode: STATUS_CODE.OK,
        data: paymentMethod,
      });
    } catch (error) {
      next(error);
    }
  },

  async removePaymentMethod(req, res, next) {
    try {
      const { id: paymentMethodId } = req.params;
      await paymentMethodService.removePaymentMethod(paymentMethodId);

      res.status(STATUS_CODE.OK).json({
        statusCode: STATUS_CODE.OK,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default paymentMethodController;
