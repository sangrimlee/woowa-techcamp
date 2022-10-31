import Router from '@/base/router';
import Component from '@/base/component';
import fileIcon from '@/assets/file.svg';
import calendarIcon from '@/assets/calendar.svg';
import statisticsIcon from '@/assets/statistics.svg';
import { PAGE_URL } from '@/constants/page';

export default class Navigation extends Component {
  constructor(parentNode) {
    super(parentNode, 'nav', { class: 'header__navigation' });
    this.activate();
  }

  activate() {
    this.addLinkEvent();
    this.addPopStateEvent();
  }

  render() {
    const navIcons = {
      [PAGE_URL.MAIN]: fileIcon,
      [PAGE_URL.CALENDAR]: calendarIcon,
      [PAGE_URL.STATISTICS]: statisticsIcon,
    };

    this.currentNode.innerHTML = `
      ${Object.values(PAGE_URL).reduce(
        (prev, pathname) =>
          prev + this.renderLink(pathname, navIcons[pathname]),
        '',
      )}`;
  }

  renderLink(pathname, icon) {
    const activeClassName = location.pathname === pathname ? 'active' : '';
    return `
      <a class="header__navigation--link link ${activeClassName}" href="${pathname}">
        ${icon}
      </a>`;
  }

  addLinkEvent() {
    this.addEvent('click', '.link', (event) => {
      event.preventDefault();
      const anchor = event.target.closest('a.link');
      Router.link(anchor.pathname);
      this.render();
    });
  }

  addPopStateEvent() {
    window.addEventListener('popstate', () => {
      this.render();
    });
  }
}
