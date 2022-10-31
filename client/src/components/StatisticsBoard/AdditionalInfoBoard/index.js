import Component from '@/base/component';
import AdditionalInfoList from './AdditionalInfoList';

import LineChartBoard from './LineChartBoard';
import { STORE_KEYS } from '@/constants/keys';

export default class AdditionalInfoBoard extends Component {
  constructor(parentNode) {
    super(parentNode, 'div', { class: 'additional-info-board' });
    this.activate();
  }

  render(categoryChartData) {
    if (!categoryChartData) return;
    this.currentNode.innerHTML = '';
    new LineChartBoard(this.currentNode, categoryChartData);
    new AdditionalInfoList(this.currentNode, {
      category: categoryChartData.category,
    });
  }

  activate() {
    this.subscribe(STORE_KEYS.CATEGORY_CHART_DATA);
  }
}
