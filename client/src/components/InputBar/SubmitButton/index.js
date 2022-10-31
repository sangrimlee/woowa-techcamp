import Component from '@/base/component';
import controller from '@/controller';
import { STORE_KEYS } from '@/constants/keys';
import checkIcon from '@/assets/check.svg';

export default class SubmitButton extends Component {
  constructor(parentNode) {
    super(parentNode, 'div', { class: 'submit-button-container' });
    this.activate();
  }

  render(isInputBarValid) {
    this.currentNode.innerHTML = `
      <button type="submit" class="submit-button" ${
        isInputBarValid ? '' : 'disabled'
      }>
        ${checkIcon}
      </button>
    `;
  }

  activate() {
    this.subscribe(STORE_KEYS.IS_INPUT_BAR_VALID);
    this.addEvent(
      'click',
      '.submit-button',
      controller.updateTransactionHistories,
    );
  }
}
