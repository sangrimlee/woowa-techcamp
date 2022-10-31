import Component from '@/base/component';
import InputBar from '@/components/InputBar';
import TransactionHistoryList from '@/components/TransactionHistoryList';
import controller from '@/controller';
export default class MainPage extends Component {
  constructor(parentNode) {
    super(parentNode, 'main', { class: 'main-page' });
    this.activate()
  }

  render() {
    new InputBar(this.currentNode);
    new TransactionHistoryList(this.currentNode);
  }

  activate() {
    controller.unsetInputBarEditMode();
  }
}
