import Component from '@/base/component';
import { STORE_KEYS } from '@/constants/keys';
import controller from '@/controller';

export default class EditingOverlay extends Component {
  constructor(parentNode) {
    super(parentNode, 'div', { class: 'editing-overlay' });
    this.activate();
  }

  render(inputBarState) {
    const overlayTempalte = this.makeOverlayTemplate(inputBarState);
    this.currentNode.innerHTML = overlayTempalte;
  }

  makeOverlayTemplate(inputBarState) {
    if (!inputBarState?.isEditing) return '';
    const { top, left } = this.calLayerPosition(inputBarState);
    return `
      <div class="editing-overlay__highligter" style="top:${top}px; left:${left}px; right:${left}px;">
        <button type="button" class="overlay__btn overlay__cancel-editing-btn">수정 취소</button>
        <button type="button" class="overlay__btn overlay__delete-btn">내역 삭제</button>
      </div>
    `;
  }

  calLayerPosition(inputBarState) {
    const { editingId } = inputBarState;
    const editingHistoryCell = this.parentNode.querySelector(
      `[data-id="${editingId}"]`,
    );
    const { top: clientTop, left: clientLeft } =
      editingHistoryCell.getBoundingClientRect();
    const { top: containerTop, left: containerLeft } =
      this.parentNode.getBoundingClientRect();

    return {
      top: clientTop - containerTop,
      left: clientLeft - containerLeft,
    };
  }

  activate() {
    this.subscribe(STORE_KEYS.INPUT_BAR_STATE);
    this.addEvent(
      'click',
      '.overlay__cancel-editing-btn',
      controller.unsetInputBarEditMode,
    );
    this.addEvent(
      'click',
      '.overlay__delete-btn',
      controller.deleteTransactionHistory,
    );
  }
}
