import Component from '@/base/component';
import controller from '@/controller';
import { INPUT_BAR_KEYS } from '@/constants/keys';
import plusIcon from '@/assets/plus.svg';
import minusIcon from '@/assets/minus.svg';

export default class MoneyInput extends Component {
  constructor(parentNode, moneyData) {
    super(parentNode, 'div', { class: 'input-box' }, moneyData);
    this.moneyData = moneyData;
    this.activate();
  }

  render(moneyData) {
    this.moneyData = moneyData;
    const { isIncome, amount } = moneyData;
    this.currentNode.innerHTML = `
      <label for="input-bar-money-amount" class="input__label">금액</label>
      <div class="input__money-container">
        <span class="input__money-sign" name="money-sign" type="text" data-isincome=${isIncome}>
          ${isIncome ? plusIcon : minusIcon}
        </span>
        <input id="input-bar-money-amount" class="input input__money-amount" name="amount"
          type="number" placeholder='입력하세요' value="${amount || ''}"/>
        <span>원</span>
      </div>
    `;
  }

  activate() {
    this.addEvent('input', '.input__money-amount', (event) =>
      controller.changeInputData(
        [{ dataKey: INPUT_BAR_KEYS.AMOUNT, value: event.target.value }],
        {
          rerender: false,
        },
      ),
    );
    this.addEvent('click', '.input__money-sign', (event) =>
      controller.changeInputData([
        { dataKey: INPUT_BAR_KEYS.IS_INCOME, value: !this.moneyData.isIncome },
      ]),
    );
  }
}
