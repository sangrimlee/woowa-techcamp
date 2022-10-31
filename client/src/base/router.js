export default class Router {
  static #instance;

  constructor(routes) {
    if (Router.#instance) {
      return Router.#instance;
    }
    this.routes = new Map(Object.entries(routes));
    this.render(location.pathname);
    this.onPopState();
    Router.#instance = this;
  }

  removePage() {
    if (this.currentPage) {
      this.currentPage.currentNode.remove();
    }
  }

  // TODO: Ternary Operator
  renderPage(pathname) {
    if (this.routes.has(pathname)) {
      this.currentPage = this.routes.get(pathname)();
    } else {
      this.currentPage = this.routes.get('*')();
    }
  }

  render(pathname) {
    this.removePage();
    this.renderPage(pathname);
    document.body.classList.toggle('overflow-hidden', pathname === '/');
  }

  onPopState() {
    window.addEventListener('popstate', () => {
      this.render(location.pathname);
    });
  }

  static link(pathname, data, unused) {
    if (!Router.#instance) return;
    history.pushState(data, unused, pathname);
    Router.#instance.render(pathname);
  }
}
