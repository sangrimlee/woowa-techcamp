import Component from '@/base/component';

export default class EmptyItem extends Component {
  constructor(parentNode) {
    super(parentNode, 'div', { class: 'empty' });
  }

  render() {
    this.currentNode.innerHTML = `<img width="180" alt="empty-removebg-preview (1)" src="https://user-images.githubusercontent.com/95538993/181478974-e1ba2220-9dc8-4f2c-826f-e11770016063.png">`;
  }
}
