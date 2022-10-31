import Component from '@/base/component';
import ListItem from './ListItem';
import EditingOverlay from './EditingOverlay';
import { makeSortedTransactionHistoryGroupbyDate } from '@/utils/transaction-history-util';
import { STORE_KEYS } from '@/constants/keys';
import EmptyItem from './EmptyItem';

export default class ListContent extends Component {
  constructor(parentNode, transactionHistories) {
    super(
      parentNode,
      'ul',
      { class: 'container transaction-history-list' },
      null,
      {
        transactionHistories,
      },
    );
    this.activate();
  }

  render(filterOptions) {
    if (!filterOptions) return;
    const { transactionHistories } = this.props;
    const sortedListItemData = makeSortedTransactionHistoryGroupbyDate(
      transactionHistories,
      filterOptions,
    );
    this.currentNode.innerHTML = '';

    if (sortedListItemData.length) {
      sortedListItemData.forEach(
        (listItemData) => new ListItem(this.currentNode, listItemData),
      );
    } else {
      new EmptyItem(this.currentNode);
    }

    new EditingOverlay(this.currentNode);
  }

  activate() {
    this.subscribe(STORE_KEYS.FILTER_OPTIONS);
  }
}
