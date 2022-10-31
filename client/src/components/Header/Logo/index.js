import Component from '@/base/component';

export default class Logo extends Component {
  constructor(parentNode) {
    super(parentNode, 'h1', { class: 'header__logo' });
  }

  render() {
    this.currentNode.innerHTML = `
      <a class="link font-dohyeon" href="/">
        우아한 가계부
      </a>
    `;
  }
}
