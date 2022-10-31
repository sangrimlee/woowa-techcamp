import controller from '@/controller';
import Component from '@/base/component';
import Modal from '@/components/Modal';
import { ACTIONS } from '@/constants/actions';
import { MODAL_MESSAGES } from '@/constants/messages';
import { STORE_KEYS, INPUT_BAR_KEYS } from '@/constants/keys';
import deleteIcon from '@/assets/delete.svg';

export default class PaymentMethodInput extends Component {
  constructor(parentNode) {
    super(parentNode, 'ul', { class: 'dropdown__list' });
    this.activate();
  }

  render(paymentMethodData) {
    if (!paymentMethodData) return;
    this.currentNode.innerHTML = `
      ${paymentMethodData
        .map(
          ({ id, title }) =>
            `<li class="dropdown__item payment-method__item" data-id="${id}" data-title="${title}">
              ${title}
              <button class="payment-method__delete-btn" type="button">
                ${deleteIcon}
              </button>
            </li>`,
        )
        .join('')}
      <li class="dropdown__item payment-method__add-btn">추가하기</li>
    `;
  }

  activate() {
    this.subscribe(STORE_KEYS.PAYMENT_METHODS);
    this.addEvent('click', '.payment-method__item', (event) =>
      this.setPaymentMethod(event),
    );
    this.addEvent('click', '.payment-method__delete-btn', (event) =>
      this.openModal(ACTIONS.DELETE_PAYMENT_METHOD, event),
    );
    this.addEvent('click', '.payment-method__add-btn', (event) =>
      this.openModal(ACTIONS.ADD_PAYMENT_METHOD, event),
    );
  }

  setPaymentMethod(event) {
    event.stopPropagation();
    const { id, title } = event.target.dataset;
    controller.changeInputData([
      { dataKey: INPUT_BAR_KEYS.PAYMENT_METHOD_ID, value: id },
      { dataKey: INPUT_BAR_KEYS.PAYMENT_METHOD_TITLE, value: title },
    ]);
  }

  openModal(actionType, event) {
    const paymentMethodItem = event.target.closest('li');
    const { id, title: paymentMethodtitle } = paymentMethodItem.dataset;
    const modalData = this.makeModalData(actionType, paymentMethodtitle);
    const onSubmit =
      actionType === ACTIONS.DELETE_PAYMENT_METHOD
        ? async () => controller.deletePaymentMethod(id)
        : async (value) => controller.addPaymentMethod(value);
    new Modal(modalData, onSubmit);
  }

  makeModalData(actionType, paymentMethodtitle) {
    const modalMessage = MODAL_MESSAGES[actionType];
    const value =
      actionType === ACTIONS.DELETE_PAYMENT_METHOD ? paymentMethodtitle : null;
    return { actionType, modalMessage, value };
  }
}
