import { convertDateString } from '@/utils/date-util';

export const DEFAULT_INPUT_BAR_DATA = {
  title: null,
  date: convertDateString(new Date()),
  categoryId: null,
  categoryTitle: null,
  paymentMethodId: null,
  paymentMethodTitle: null,
  isIncome: false,
  amount: null,
};
export const DEFAULT_INPUT_BAR_STATE = { isEditing: false, editingId: null };
export const DEFAULT_FILTER_OPTIONS = { income: true, spent: true };
export const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];
