import Component from '@/base/component';
import ListItemHeader from './ListItemHeader';
import { calculateTotalAmount } from '@/utils/transaction-history-util';
import ListItemCell from './ListItemCell';

export default class ListItem extends Component {
  constructor(parentNode, listItemData, props) {
    super(
      parentNode,
      'li',
      { class: 'transaction-history-item' },
      listItemData,
      props,
    );
  }

  render(listItemData) {
    const [dateString, transactionHistories] = listItemData;
    const totalIncomeAndSpent = calculateTotalAmount(transactionHistories);
    const listItemHeaderData = { dateString, ...totalIncomeAndSpent };
    new ListItemHeader(this.currentNode, listItemHeaderData, this.props);
    transactionHistories.forEach(
      (history) => new ListItemCell(this.currentNode, history),
    );
  }
}
