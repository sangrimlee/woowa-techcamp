// TODO: response의 status code로 에러처리
const request = {
  async getTranscationHistoriesByMonth(targetDate) {
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth() + 1;
    const { data } = await (
      await fetch(
        `/api/transaction-history?year=${targetYear}&month=${targetMonth}`,
      )
    ).json();
    return data;
  },

  async createTransactionHistory({
    title,
    date,
    categoryId,
    paymentMethodId,
    isIncome,
    amount,
  }) {
    const requestMessage = makeRequestMessage('POST', {
      title,
      date,
      categoryId,
      paymentMethodId,
      isIncome,
      amount,
    });
    const { data } = await (
      await fetch(`/api/transaction-history`, requestMessage)
    ).json();
    return data;
  },

  async updateTransactionHistory({
    id,
    title,
    date,
    categoryId,
    paymentMethodId,
    isIncome,
    amount,
  }) {
    const requestMessage = makeRequestMessage('PATCH', {
      title,
      date,
      categoryId,
      paymentMethodId,
      isIncome,
      amount,
    });
    const { data } = await (
      await fetch(`/api/transaction-history/${id}`, requestMessage)
    ).json();
    return data;
  },

  async removeTransactionHistory(id) {
    const requestMessage = makeRequestMessage('DELETE');
    await fetch(`/api/transaction-history/${id}`, requestMessage);
  },

  async getPaymentMethods() {
    const { data } = await (await fetch(`/api/payment-method`)).json();
    return data;
  },

  async createPaymentMethods(title) {
    const requestMessage = makeRequestMessage('POST', {
      title,
    });
    const { data } = await (
      await fetch(`/api/payment-method`, requestMessage)
    ).json();
    return data;
  },

  async removePaymentMethod(id) {
    const requestMessage = makeRequestMessage('DELETE');
    await fetch(`/api/payment-method/${id}`, requestMessage);
  },

  async getCategories() {
    const { data } = await (await fetch(`/api/category`)).json();
    return data;
  },

  async getTotalAmountByCategory(categoryTitle, date) {
    const { data } = await (
      await fetch(
        `/api/transaction-history/category?range=6&category=${categoryTitle}&date=${date}`,
      )
    ).json();
    return data;
  },
};

function makeRequestMessage(methodType, requestBody) {
  return {
    method: methodType,
    body: JSON.stringify(requestBody),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  };
}

export default request;
