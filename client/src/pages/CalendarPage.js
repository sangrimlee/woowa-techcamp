import Component from '@/base/component';
import Calendar from '../components/Calendar';

export default class CalendarPage extends Component {
  constructor(parentNode) {
    super(parentNode, 'main', { class: 'calendar-page' });
  }

  render() {
    new Calendar(this.currentNode);
  }
}
