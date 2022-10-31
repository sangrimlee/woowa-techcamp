import CustomException from '../common/custom-exception';
import categoryService from './category.service';
import paymentMethodService from './payment-method.service';
import transactionHistoryModel from '../models/transaction-history.model';
import { STATUS_CODE } from '../constants/status-code.constant';
import { ERROR_MESSAGES } from '../constants/error-message.constant';
import {
  convertDateString,
  getAllDateInfo,
  getFirstDayOfMonth,
  getLastDayOfMonth,
} from '../utils/date.util';

const transactionHistoryService = {
  async findByIdOrFail(transactionHistoryId) {
    const transactionHistory = await transactionHistoryModel.findById(
      transactionHistoryId,
    );
    if (!transactionHistory) {
      throw new CustomException(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.TRANSACTION_HISTORTY_NOT_FOUND,
      );
    }
    return transactionHistory;
  },

  async createTransactionHistory(createTransactionHistoryDto) {
    await paymentMethodService.findByIdOrFail(
      createTransactionHistoryDto.paymentMethodId,
    );
    await categoryService.findByIdOrFail(
      createTransactionHistoryDto.categoryId,
    );
    const { insertId } = await transactionHistoryModel.create(
      createTransactionHistoryDto,
    );
    const transactionHistory = await transactionHistoryModel.findByIdWithDetail(
      insertId,
    );
    return transactionHistory;
  },

  async updateTransactionHistory(
    transactionHistoryId,
    updateTransactionHistoryDto,
  ) {
    const transcationHistory = await this.findByIdOrFail(transactionHistoryId);
    const updatedTransactionHistory = {
      ...transcationHistory,
      ...updateTransactionHistoryDto,
    };
    await paymentMethodService.findByIdOrFail(
      updatedTransactionHistory.paymentMethodId,
    );
    await categoryService.findByIdOrFail(updatedTransactionHistory.categoryId);
    await transactionHistoryModel.update(
      transactionHistoryId,
      updatedTransactionHistory,
    );
    const transactionHistory = await transactionHistoryModel.findByIdWithDetail(
      transactionHistoryId,
    );
    return transactionHistory;
  },

  async removeTransactionHistory(transactionHistoryId) {
    await this.findByIdOrFail(transactionHistoryId);
    await transactionHistoryModel.remove(transactionHistoryId);
  },

  async getTranscationHistoriesByMonth(year, month) {
    const startDate = convertDateString(getFirstDayOfMonth(year, month));
    const endDate = convertDateString(getLastDayOfMonth(year, month));

    const transactionHistories = await transactionHistoryModel.findAllInPeriod(
      startDate,
      endDate,
    );
    return transactionHistories;
  },

  async getTotalSpentByCategory(date, range, category) {
    const { year, month } = getAllDateInfo(new Date(date));
    const currentDate = convertDateString(getFirstDayOfMonth(year, month));
    const totalSpentByCatgory =
      await transactionHistoryModel.getTotalSpentByCategoryInPeriod(
        currentDate,
        range,
        category,
      );
    return totalSpentByCatgory;
  },
};

export default transactionHistoryService;
