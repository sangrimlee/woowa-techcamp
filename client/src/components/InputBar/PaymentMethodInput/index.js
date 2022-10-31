import Component from '@/base/component';
import Dropdown from '../Dropdown';
import PaymentMethodList from './PaymentMethodList';
import chevronDown from '@/assets/chevron-down.svg';

export default class PaymentMethodInput extends Component {
  constructor(parentNode, paymentMethodTitle) {
    super(parentNode, 'div', { class: 'input-box' }, paymentMethodTitle);
    this.activate();
  }

  render(paymentMethodTitle) {
    this.currentNode.innerHTML = `
      <label for="inputbar-payment-methods" class="input__label">결제수단</label>
      <div class="dropdown-input">
        <input id="inputbar-payment-methods" class="input input__payment-methods"
          name="category" type="text" placeholder="선택하세요"
          value="${paymentMethodTitle || ''}" readonly />
        <div class="dropdown-input__icon">${chevronDown}</div>
      </div>
    `;
    new Dropdown(this.currentNode, PaymentMethodList);
  }

  activate() {
    this.addEvent('click', '.dropdown-input', () => this.toggleDropDown());
  }

  toggleDropDown() {
    this.currentNode.classList.toggle('is-open-dropdown');
  }
}
