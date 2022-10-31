import controller from '@/controller';
import Component from '@/base/component';
import { STORE_KEYS, INPUT_BAR_KEYS } from '@/constants/keys';

export default class CategoryList extends Component {
  constructor(parentNode, options) {
    super(parentNode, 'ul', { class: 'dropdown__list' }, null, { options });
    this.activate();
  }

  render(categoryListData) {
    if (!categoryListData) return;
    this.currentNode.innerHTML = categoryListData
      .map(this.makeCategoryTemplate.bind(this))
      .join('');
  }

  makeCategoryTemplate(categoryData) {
    const { isIncome: currentInputBarIsIncome } = this.props.options;
    const { id, title, isIncome } = categoryData;
    return isIncome == currentInputBarIsIncome
      ? `<li class="dropdown__item category__item" data-id="${id}" data-title="${title}">${title}</li>`
      : '';
  }

  activate() {
    this.subscribe(STORE_KEYS.CATEGORIES);
    this.addEvent('click', '.category__item', (event) =>
      this.setCategory(event),
    );
  }

  setCategory(event) {
    event.stopPropagation();
    const { id, title } = event.target.dataset;
    controller.changeInputData([
      { dataKey: INPUT_BAR_KEYS.CATEGORY_ID, value: id },
      { dataKey: INPUT_BAR_KEYS.CATEGORY_TITLE, value: title },
    ]);
  }
}
