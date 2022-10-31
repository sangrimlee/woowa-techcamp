import Component from '@/base/component';
import { DAY_NAMES } from '@/constants/data';

export default class CalendarHeader extends Component {
  constructor(parentNode) {
    super(parentNode, 'thead', { class: 'calendar-header' });
  }

  render() {
    this.currentNode.innerHTML = `
      <tr class="calendar-header__weekdays">
        ${DAY_NAMES.map(
          (weekDay) => `<th class="calendar-header__weekday">${weekDay}</th>`,
        ).join('')}
      </tr>
    `;
  }
}
