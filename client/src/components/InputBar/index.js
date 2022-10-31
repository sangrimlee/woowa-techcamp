import './index.css';
import Component from '@/base/component';
import DateInput from './DateInput';
import TitleInput from './TitleInput';
import CategoryInput from './CategoryInput';
import PaymentMethodInput from './PaymentMethodInput';
import MoneyInput from './MoneyInput';
import SubmitButton from './SubmitButton';
import { STORE_KEYS } from '@/constants/keys';

export default class InputBar extends Component {
  constructor(parentNode) {
    super(parentNode, 'form', { class: 'input-bar' });
    this.activate();
  }

  render(inputBarData) {
    if (!inputBarData) return;
    const { date, title, categoryTitle, paymentMethodTitle, isIncome, amount } =
      inputBarData;
    this.currentNode.innerHTML = '';
    new DateInput(this.currentNode, date);
    new CategoryInput(this.currentNode, categoryTitle, isIncome);
    new TitleInput(this.currentNode, title);
    new PaymentMethodInput(this.currentNode, paymentMethodTitle);
    new MoneyInput(this.currentNode, { isIncome, amount });
    new SubmitButton(this.currentNode);
  }

  activate() {
    this.subscribe(STORE_KEYS.INPUT_BAR_DATA);
  }
}
