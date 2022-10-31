import './index.css';
import Component from '@/base/component';
import { ACTIONS } from '@/constants/actions';

export default class Modal extends Component {
  constructor(modalData, onSubmit) {
    super(
      document.getElementById('modal'),
      'div',
      { class: 'modal__container' },
      modalData,
      { onSubmit },
    );
    this.activate();
  }

  render(modalData) {
    const { modalMessage, actionType, value } = modalData;
    const inputDisabled =
      actionType === ACTIONS.ADD_PAYMENT_METHOD ? '' : 'disabled';
    const addBtnTemplate = `<button class="modal__submit-btn modal__add-btn">등록</button>`;
    const deleteBtnTemplate = `<button class="modal__submit-btn modal__delete-btn">삭제</button>`;

    this.currentNode.innerHTML = `
      <div class="modal__backdrop"></div>
      <div class="modal__content">
        <h3 class="modal__title">${modalMessage.title}</h3>
        <p class="modal__description">${modalMessage.description}</p>
        <input class="modal__input" placeholder="입력하세요."
          value="${value || ''}"  ${inputDisabled}/>
        <div class="modal__button-conatiner">
            <button class="modal__cancel-btn">취소</button>
            ${
              actionType === ACTIONS.ADD_PAYMENT_METHOD
                ? addBtnTemplate
                : deleteBtnTemplate
            }
        </div>
      </div>`;
  }

  activate() {
    const { onSubmit } = this.props;
    this.addEvent('click', '.modal__backdrop', () => this.closeModal());
    this.addEvent('click', '.modal__cancel-btn', () => this.closeModal());
    this.addEvent('click', '.modal__submit-btn', async (event) => {
      const input = this.currentNode.querySelector('input');
      await onSubmit(input.value);
      this.closeModal();
    });
  }

  closeModal() {
    this.parentNode.innerHTML = '';
  }
}
