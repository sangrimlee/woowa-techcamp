import store from '@/store';
import { STORE_KEYS } from '@/constants/keys';
import request from '@/utils/api-util';
import { INPUT_BAR_KEYS } from '../constants/keys';
import {
  DEFAULT_INPUT_BAR_DATA,
  DEFAULT_INPUT_BAR_STATE,
} from '@/constants/data';
import { convertDateString } from '@/utils/date-util';

// 내역 CRUD관련 컨트롤러
async function addNewTransactionHistory(currInputData) {
  const formattedInputData = formatInputDataForRequest(currInputData);
  const newTransactionHistory = await request.createTransactionHistory(
    formattedInputData,
  );
  const currentTransactionHistories = store.getData(
    STORE_KEYS.TRANSACTION_HISTORIES,
  );
  const updatedTransactionHistories = [
    ...currentTransactionHistories,
    newTransactionHistory,
  ];
  return updatedTransactionHistories;
}

async function updateTransactionHistories(event) {
  event.preventDefault();
  const currInputData = store.getData(STORE_KEYS.INPUT_BAR_DATA);
  const inputBarState = store.getData(STORE_KEYS.INPUT_BAR_STATE);

  const updatedTransactionHistories = inputBarState.isEditing
    ? await editTransactionHistory(currInputData)
    : await addNewTransactionHistory(currInputData);
  store.setData(STORE_KEYS.TRANSACTION_HISTORIES, updatedTransactionHistories);
  clearInputBar();
}

async function editTransactionHistory(currInputData) {
  const formattedInputData = formatInputDataForRequest(currInputData);
  const editedData = await request.updateTransactionHistory(formattedInputData);
  store.setData(STORE_KEYS.INPUT_BAR_STATE, DEFAULT_INPUT_BAR_STATE);
  const currentTransactionHistories = store.getData(
    STORE_KEYS.TRANSACTION_HISTORIES,
  );
  const updatedTransactionHistories = currentTransactionHistories.map(
    (history) => {
      return history.id === currInputData.id ? editedData : history;
    },
  );
  return updatedTransactionHistories;
}

async function deleteTransactionHistory() {
  const targetId = store.getData(STORE_KEYS.INPUT_BAR_STATE).editingId;
  await request.removeTransactionHistory(targetId);
  const currentTransactionHistories = store.getData(
    STORE_KEYS.TRANSACTION_HISTORIES,
  );
  const updatedTransactionHistories = currentTransactionHistories.filter(
    (history) => history.id !== parseInt(targetId),
  );
  unsetInputBarEditMode();
  store.setData(STORE_KEYS.TRANSACTION_HISTORIES, updatedTransactionHistories);
}

function formatInputDataForRequest(inputData) {
  const originDateString = inputData.date;
  const formattedDateString = convertDateString(new Date(originDateString));
  return { ...inputData, date: formattedDateString };
}

// input bar 관련 컨트롤러
function changeInputData(changedDataList, options) {
  const inputData = { ...store.getData(STORE_KEYS.INPUT_BAR_DATA) };
  for (const changedData of changedDataList) {
    const { dataKey, value } = changedData;
    inputData[dataKey] = value;
  }
  store.setData(STORE_KEYS.INPUT_BAR_DATA, inputData, options);
  const isInputBarValid = checkInputBarDataValidity(inputData);
  store.setData(STORE_KEYS.IS_INPUT_BAR_VALID, isInputBarValid);
}

function checkInputBarDataValidity(inputBarData) {
  return Object.values(inputBarData).every(
    (value) => value !== null && value !== '',
  );
}

function clearInputBar() {
  const clearedInputBarData = DEFAULT_INPUT_BAR_DATA;
  const currHeaderDate = store.getData(STORE_KEYS.CURRENT_HEADER_DATE);
  clearedInputBarData.date = currHeaderDate;
  store.setData(STORE_KEYS.INPUT_BAR_DATA, clearedInputBarData);
  store.setData(STORE_KEYS.IS_INPUT_BAR_VALID, false);
}

function setInputBarEditMode(historyData) {
  store.setData(STORE_KEYS.INPUT_BAR_DATA, historyData);
  store.setData(STORE_KEYS.INPUT_BAR_STATE, {
    isEditing: true,
    editingId: historyData.id,
  });
}

function resetInputBarState() {
  store.setData(STORE_KEYS.INPUT_BAR_STATE, {
    isEditing: false,
    editingId: null,
  });
}

function unsetInputBarEditMode() {
  resetInputBarState();
  clearInputBar();
}

// 결제 수단 관련 컨트롤러
async function addPaymentMethod(title) {
  const newPaymentMethod = await request.createPaymentMethods(title);
  const currPaymentMethods = store.getData(STORE_KEYS.PAYMENT_METHODS);
  const updatedPaymentMethods = [...currPaymentMethods, newPaymentMethod];
  store.setData(STORE_KEYS.PAYMENT_METHODS, updatedPaymentMethods);
}

async function deletePaymentMethod(targetId) {
  const currHeaderDate = store.getData(STORE_KEYS.CURRENT_HEADER_DATE);
  await Promise.all([
    await request.removePaymentMethod(targetId),
    await setCurrentMonthTransactionHistories(currHeaderDate),
  ]);
  const currPaymentMethods = store.getData(STORE_KEYS.PAYMENT_METHODS);
  const updatedPaymentMethods = currPaymentMethods.filter(
    (paymentMethod) => paymentMethod.id !== parseInt(targetId),
  );
  store.setData(STORE_KEYS.PAYMENT_METHODS, updatedPaymentMethods);
}

// 기타 컨트롤러
function changeFilterOptions(filterOption, isFiltered) {
  const currFilterOptions = store.getData(STORE_KEYS.FILTER_OPTIONS);
  const updatedFilterOptions = {
    ...currFilterOptions,
    [filterOption]: isFiltered,
  };
  store.setData(STORE_KEYS.FILTER_OPTIONS, updatedFilterOptions);
}

async function changeHeaderMonth(increment) {
  const headerDate = store.getData(STORE_KEYS.CURRENT_HEADER_DATE);
  headerDate.setDate(1);
  headerDate.setMonth(headerDate.getMonth() + increment);
  store.setData(STORE_KEYS.CATEGORY_CHART_DATA, null);
  await setCurrentMonthTransactionHistories(headerDate);
  store.setData(STORE_KEYS.CURRENT_HEADER_DATE, headerDate);
  changeInputData([{ dataKey: INPUT_BAR_KEYS.DATE, value: headerDate }]);
  changeInputData(INPUT_BAR_KEYS.DATE, headerDate);
}

async function setCurrentMonthTransactionHistories(currDate) {
  const newTransactionHistories = await request.getTranscationHistoriesByMonth(
    currDate,
  );
  store.setData(STORE_KEYS.TRANSACTION_HISTORIES, newTransactionHistories);
}

async function setChartData(categoryTitle) {
  const currDate = store.getData(STORE_KEYS.CURRENT_HEADER_DATE);
  const categoryChartData = await request.getTotalAmountByCategory(
    categoryTitle,
    convertDateString(currDate),
  );
  store.setData(STORE_KEYS.CATEGORY_CHART_DATA, categoryChartData);
}

const controller = {
  decreaseMonth: () => changeHeaderMonth(-1),
  increaseMonth: () => changeHeaderMonth(1),
  changeInputData: (key, data, options) => changeInputData(key, data, options),
  updateTransactionHistories,
  deleteTransactionHistory,
  addPaymentMethod,
  deletePaymentMethod,
  setInputBarEditMode,
  unsetInputBarEditMode,
  changeFilterOptions,
  setChartData,
};

export default controller;
