import Component from '@/base/component';
import controller from '@/controller';
import { INPUT_BAR_KEYS } from '@/constants/keys';
import {
  convertDateString,
  getFirstDateOfMonth,
  getLastDateOfMonth,
} from '@/utils/date-util';

export default class DateInput extends Component {
  constructor(parentNode, dateInputData) {
    super(parentNode, 'div', { class: 'input-box' }, dateInputData);
    this.activate();
  }

  render(dateInputData) {
    const dateObj = new Date(dateInputData);
    const dateString = convertDateString(dateObj);
    const firstDateString = convertDateString(getFirstDateOfMonth(dateObj));
    const lastDateString = convertDateString(getLastDateOfMonth(dateObj));

    this.currentNode.innerHTML = `
      <label for="inputbar-date" class="input__label">일자</label>
      <input id="inputbar-date" class="input input__date" name="date" type="date"
        min="${firstDateString}" max="${lastDateString}" value="${dateString}"/>
    `;
  }

  activate() {
    this.addEvent('input', '.input__date', (event) =>
      this.handleDateInput(event),
    );
  }

  handleDateInput(event) {
    const inputValue = event.target.value;
    if (!inputValue) return;
    controller.changeInputData([
      {
        dataKey: INPUT_BAR_KEYS.DATE,
        value: new Date(inputValue),
      },
    ]);
  }
}
