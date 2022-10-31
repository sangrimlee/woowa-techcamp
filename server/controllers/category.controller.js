import categoryService from '../services/category.service';
import { STATUS_CODE } from '../constants/status-code.constant';

const categoryController = {
  async getAllCategories(req, res, next) {
    try {
      const categories = await categoryService.getAllCategories();

      res.status(STATUS_CODE.OK).json({
        statusCode: STATUS_CODE.OK,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default categoryController;
