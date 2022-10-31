import Component from '@/base/component';
import { STORE_KEYS } from '@/constants/keys';
import {
  calculateTotalAmount,
  makeGroupByDate,
} from '@/utils/transaction-history-util';
import {
  splitByWeek,
  convertDateString,
  getAllDatesForCalendar,
} from '@/utils/date-util';

export default class CalendarBody extends Component {
  constructor(parentNode, props) {
    super(parentNode, 'tbody', { class: 'calendar-body' }, null, props);
    this.activate();
  }

  activate() {
    this.subscribe(STORE_KEYS.TRANSACTION_HISTORIES);
  }

  render(transactionHistories) {
    if (!transactionHistories) return;
    const { currentDate } = this.props;
    const calendarDates = getAllDatesForCalendar(currentDate);
    const transactionHistoriesByDate = makeGroupByDate(transactionHistories);
    const weeks = splitByWeek(calendarDates);
    this.currentNode.innerHTML = `
      ${weeks
        .map((week) => this.renderWeek(week, transactionHistoriesByDate))
        .join('')}
    `;
  }

  renderWeek(week, transactionHistoriesByDate) {
    return `
      <tr class="calendar-body__week">
        ${week
          .map((calendarInfo) =>
            this.renderDay(calendarInfo, transactionHistoriesByDate),
          )
          .join('')}
      </tr>
    `;
  }

  renderDay(calendarInfo, transactionHistoriesByDate) {
    const { date, dateString, isCurrentMonth } = calendarInfo;
    const transactionHistories =
      transactionHistoriesByDate.get(dateString) || [];
    const { totalIncomeAmount, totalSpentAmount } =
      calculateTotalAmount(transactionHistories);
    const totalAmount = totalIncomeAmount - totalSpentAmount;

    const isOutRange = !isCurrentMonth ? 'out-range' : '';
    const isToday = convertDateString(new Date()) === dateString ? 'today' : '';
    return `
      <td class="calendar-body__day ${isToday}">
        ${
          totalIncomeAmount !== 0
            ? `<span class="calendar-day__income">
              ${totalIncomeAmount.toLocaleString()}
            </span>`
            : ''
        }
        ${
          totalSpentAmount !== 0
            ? `<span class="calendar-day__spent">
              -${totalSpentAmount.toLocaleString()}
            </span>`
            : ''
        }
        ${
          totalAmount !== 0
            ? `<span class="calendar-day__total">
              ${totalAmount.toLocaleString()}
            </span>`
            : ''
        }
        <span class="calendar-day__date ${isOutRange}">${date.getDate()}</span>
      </td>
    `;
  }
}
