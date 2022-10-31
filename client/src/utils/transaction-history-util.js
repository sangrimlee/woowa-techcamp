// data: 서버로 부터 받은 transactionHistories
import { convertDateString } from '@/utils/date-util';

export function calculateTotalAmount(data) {
  return data.reduce(
    (totalAmount, { isIncome, amount }) => {
      if (isIncome) {
        totalAmount.incomeHistoryCnt++;
        totalAmount.totalIncomeAmount += amount;
      } else {
        totalAmount.spentHistoryCnt++;
        totalAmount.totalSpentAmount += amount;
      }
      return totalAmount;
    },
    {
      totalIncomeAmount: 0,
      incomeHistoryCnt: 0,
      totalSpentAmount: 0,
      spentHistoryCnt: 0,
    },
  );
}

export function makeSortedTransactionHistoryGroupbyDate(data, filterOptions) {
  return sortGroupByDate(
    makeGroupByDate(filterByTransactionType(data, filterOptions)),
  );
}

export function makeTransactionHistoryGroupbyCategory(data, filterOptions) {
  return makeGroupByCategory(filterByTransactionType(data, filterOptions));
}

export function makeGroupByDate(data) {
  const groupMap = new Map();
  data.forEach((value) => {
    const dateString = convertDateString(new Date(value.date));
    if (!groupMap.has(dateString)) {
      groupMap.set(dateString, []);
    }
    groupMap.get(dateString).push(value);
  });
  return groupMap;
}

function makeGroupByCategory(data) {
  const groupMap = new Map();
  data.forEach((value) => {
    const { categoryId } = value;
    if (!groupMap.has(categoryId)) {
      groupMap.set(categoryId, []);
    }
    groupMap.get(categoryId).push(value);
  });
  return groupMap;
}

function filterByTransactionType(data, filterOptions) {
  return data.filter((value) => doesHistoryPassFilter(value, filterOptions));
}

function doesHistoryPassFilter(value, filterOptions) {
  const type = value.isIncome ? 'income' : 'spent';
  return filterOptions[type];
}

function sortGroupByDate(groupMap) {
  const groupArr = [...groupMap];
  const sortedGroupArr = groupArr.sort(
    (group1, group2) => new Date(group2[0]) - new Date(group1[0]),
  );
  return sortedGroupArr;
}

export function getTotalSpentAmounts(data, categories) {
  const totalSpentAmounts = new Map();
  categories.forEach(({ title }) => {
    totalSpentAmounts.set(title, 0);
  });

  data.forEach(({ isIncome, categoryTitle, amount }) => {
    if (!isIncome) {
      totalSpentAmounts.set(
        categoryTitle,
        totalSpentAmounts.get(categoryTitle) + amount,
      );
    }
  });
  return categories
    .map((category) => ({
      ...category,
      totalSpentAmount: totalSpentAmounts.get(category.title),
    }))
    .sort((a, b) => b.totalSpentAmount - a.totalSpentAmount);
}
