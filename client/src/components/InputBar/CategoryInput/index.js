import Component from '@/base/component';
import Dropdown from '../Dropdown';
import CategoryList from './CategoryList';
import chevronDown from '@/assets/chevron-down.svg';

export default class CategoryInput extends Component {
  constructor(parentNode, categoryTitle, isIncome) {
    super(parentNode, 'div', { class: 'input-box' }, categoryTitle, {
      isIncome,
    });
    this.activate();
  }

  render(categoryTitle) {
    this.currentNode.innerHTML = `
      <label for="inputbar-category" class="input__label">분류</label>
      <div class="dropdown-input">
        <input id="inputbar-category" class="input input__category"
          name="category" type="text" placeholder="선택하세요"
          value="${categoryTitle || ''}" readonly />
        <div class="dropdown-input__icon">${chevronDown}</div>
      </div>
    `;
    new Dropdown(this.currentNode, CategoryList, this.props);
  }

  activate() {
    this.addEvent('click', '.dropdown-input', (event) =>
      this.toggleDropDown(event),
    );
  }

  toggleDropDown() {
    this.currentNode.classList.toggle('is-open-dropdown');
  }
}
