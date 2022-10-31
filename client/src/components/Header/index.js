import './index.css';
import Component from '@/base/component';
import Logo from './Logo';
import Navigation from './Navigation';
import HeaderCalendar from './HeaderCalendar';

export default class Header extends Component {
  constructor(parentNode) {
    super(parentNode, 'header', { class: 'header' });
  }

  render() {
    this.currentNode.innerHTML = `<div class="header__container container"></div>`;
    const headerContainer =
      this.currentNode.querySelector('.header__container');
    new Logo(headerContainer);
    new HeaderCalendar(headerContainer);
    new Navigation(headerContainer);
  }
}
