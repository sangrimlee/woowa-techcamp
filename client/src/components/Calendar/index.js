import './index.css';
import Component from '@/base/component';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import CalendarFooter from './CalendarFooter';
import { STORE_KEYS } from '@/constants/keys';

export default class Calendar extends Component {
  constructor(parentNode) {
    super(parentNode, 'table', {
      class: 'calendar container',
    });
    this.activate();
  }

  activate() {
    this.subscribe(STORE_KEYS.CURRENT_HEADER_DATE);
  }

  render(currentDate) {
    this.currentNode.innerHTML = '';
    if (!currentDate) return;
    new CalendarHeader(this.currentNode);
    new CalendarBody(this.currentNode, { currentDate });
    new CalendarFooter(this.currentNode);
  }
}
