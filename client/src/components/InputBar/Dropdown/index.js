import Component from '@/base/component';

export default class Dropdown extends Component {
  constructor(parentNode, ListComponent, options) {
    super(parentNode, 'div', { class: 'dropdown closed' }, null, {
      ListComponent,
      options,
    });
    this.activate();
  }

  render() {
    const { ListComponent, options } = this.props;
    this.currentNode.innerHTML = `<div class="dropdown__backdrop"></div>`;
    new ListComponent(this.currentNode, options);
  }

  activate() {
    this.addEvent('click', '.dropdown__backdrop', () => this.onCloseDropdown());
  }

  onCloseDropdown() {
    this.parentNode.classList.toggle('is-open-dropdown');
  }
}
