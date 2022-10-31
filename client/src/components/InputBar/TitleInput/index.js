import Component from '@/base/component';
import controller from '@/controller';
import { INPUT_BAR_KEYS } from '@/constants/keys';
export default class TitleInput extends Component {
  constructor(parentNode, titleData) {
    super(parentNode, 'div', { class: 'input-box' }, titleData);
    this.activate();
  }

  render(titleData) {
    this.currentNode.innerHTML = `
      <label for="inputbar-title" class="input__label">내용</label>
      <input id="inputbar-title" class="input input__content" name="title"
        type="text" placeholder='입력하세요' value="${titleData || ''}" />
    `;
  }

  activate() {
    this.addEvent('input', '.input__content', (event) =>
      controller.changeInputData(
        [{ dataKey: INPUT_BAR_KEYS.TITLE, value: event.target.value }],
        {
          rerender: false,
        },
      ),
    );
  }
}
