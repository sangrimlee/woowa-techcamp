import Router from '@/base/router';
import Component from '@/base/component';

export default class NotFoundPage extends Component {
  constructor(parentNode) {
    super(parentNode, 'main', { class: 'not-found-page' });
  }

  activate() {
    this.addLinkEvent();
  }

  render() {
    this.parentNode.innerHTML = '';
    this.currentNode.innerHTML = `
      <div class="not-found__container">
        <h1 class="not-found__title font-dohyeon">앗!</h1>
        <div class="not-found__description">
          이용에 불편을 드려 죄송합니다.<br>
          해당페이지는 사용할 수 없는 페이지입니다.<br>
          홈으로 이동하시어 서비스를 다시 이용해주세요.</div>
        <a class="link not-found__link" href="/">
          홈으로 가기
        </a>
      </div>
    `;
  }

  addLinkEvent() {
    this.addEvent('click', '.link', (event) => {
      event.preventDefault();
      const anchor = event.target.closest('a.link');
      Router.link(anchor.pathname);
    });
  }
}
