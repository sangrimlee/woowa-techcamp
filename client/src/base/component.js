import store from '@/store';

export default class Component {
  constructor(parentNode, tagName, attrs, initialData, props) {
    this.parentNode = parentNode;
    this.currentNode = document.createElement(tagName);
    this.setAttributes(attrs);
    this.props = props;
    this.render(initialData);
    this.parentNode.appendChild(this.currentNode);
  }

  setAttributes(attrs) {
    if (!attrs) return;
    Object.entries(attrs).forEach(([key, value]) =>
      this.currentNode.setAttribute(key, value),
    );
  }

  addEvent(eventType, selector, callback) {
    this.currentNode.addEventListener(eventType, (event) => {
      if (event.target.closest(selector)) {
        callback(event);
      }
    });
  }

  subscribe(key) {
    store.subscribe(key, {
      node: this.currentNode,
      callback: this.render.bind(this),
    });
  }

  activate() {}

  render() {}
}
