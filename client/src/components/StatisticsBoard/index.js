import './index.css';
import Component from '@/base/component';
import DoughnutChartBoard from './DoughnutChartBoard';
import AdditionalInfoBoard from './AdditionalInfoBoard';
import { STORE_KEYS } from '@/constants/keys';

export default class StatisticsBoard extends Component {
  constructor(parentNode) {
    super(parentNode, 'div', { class: 'statistics-board' });
    this.activate();
  }

  render(transactionHistories) {
    if (!transactionHistories) return;
    this.currentNode.innerHTML = '';
    new DoughnutChartBoard(this.currentNode, transactionHistories);
    new AdditionalInfoBoard(this.currentNode);
  }

  activate() {
    this.subscribe(STORE_KEYS.TRANSACTION_HISTORIES);
  }
}
