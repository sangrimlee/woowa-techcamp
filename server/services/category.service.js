import categoryModel from '../models/category.model';
import CustomException from '../common/custom-exception';
import { STATUS_CODE } from '../constants/status-code.constant';
import { ERROR_MESSAGES } from '../constants/error-message.constant';

const categoryService = {
  async findByIdOrFail(categoryId) {
    const category = await categoryModel.findById(categoryId);
    if (!category) {
      throw new CustomException(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.CATEGORY_NOT_FOUND,
      );
    }
    return category;
  },

  async getAllCategories() {
    const categories = await categoryModel.findAll();
    return categories;
  },
};

export default categoryService;
