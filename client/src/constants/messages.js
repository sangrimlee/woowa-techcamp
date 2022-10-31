import { ACTIONS } from './actions';

export const MODAL_MESSAGES = {
  [ACTIONS.DELETE_PAYMENT_METHOD]: {
    title: '결제수단 삭제',
    description: '해당 결제수단을 삭제하시겠습니까?',
  },
  [ACTIONS.ADD_PAYMENT_METHOD]: {
    title: '결제수단 추가',
    description: '추가하실 결제수단을 적어주세요.',
  },
};
