import '@/styles/normalize.css';
import '@/styles/fonts.css';
import '@/styles/global.css';
import Router from '@/base/router';
import Header from '@/components/Header';
import MainPage from '@/pages/MainPage';
import NotFoundPage from '@/pages/NotFoundPage';
import CalendarPage from '@/pages/CalendarPage';
import StatisticsPage from '@/pages/StatisticsPage';
import store from '@/store';
import request from '@/utils/api-util';
import { PAGE_URL } from '@/constants/page';
import {
  DEFAULT_INPUT_BAR_DATA,
  DEFAULT_INPUT_BAR_STATE,
  DEFAULT_FILTER_OPTIONS,
} from '@/constants/data';

(async function () {
  const app = document.getElementById('app');
  const routes = {
    [PAGE_URL.MAIN]: () => new MainPage(app),
    [PAGE_URL.CALENDAR]: () => new CalendarPage(app),
    [PAGE_URL.STATISTICS]: () => new StatisticsPage(app),
    '*': () => new NotFoundPage(app),
  };

  await initStore();
  new Header(app);
  new Router(routes);
})();

async function initStore() {
  const currentHeaderDate = new Date();
  const [transactionHistories, categories, paymentMethods] = await Promise.all([
    request.getTranscationHistoriesByMonth(currentHeaderDate),
    request.getCategories(),
    request.getPaymentMethods(),
  ]);
  const inputBarData = DEFAULT_INPUT_BAR_DATA;
  const inputBarState = DEFAULT_INPUT_BAR_STATE;
  const isInputBarValid = false;
  const filterOptions = DEFAULT_FILTER_OPTIONS;
  const categoryChartData = null;

  const initialData = {
    currentHeaderDate,
    transactionHistories,
    categories,
    paymentMethods,
    inputBarData,
    inputBarState,
    isInputBarValid,
    filterOptions,
    categoryChartData,
  };
  store.initStore(initialData);
}
