const store = (function () {
  let data;
  let observerTable;

  function initStore(initialData) {
    data = new Map(Object.entries(initialData));
    observerTable = new Map();

    const keys = Object.keys(initialData);
    keys.forEach((key) => {
      observerTable.set(key, []);
    });
  }

  function validateDataKey(key) {
    if (!data.has(key)) {
      throw new Error('Data has no key');
    }
  }

  function getObservers(key) {
    validateDataKey(key);
    return observerTable.get(key);
  }

  function subscribe(key, observer) {
    const observers = getObservers(key);
    observers.push(observer);
    observer.callback(data.get(key));
  }

  function isObserverAlive(node) {
    return document.body.contains(node);
  }

  function filterDeadObserver(key) {
    const filteredObservers = getObservers(key).filter((observer) =>
      isObserverAlive(observer.node),
    );
    observerTable.set(key, filteredObservers);
  }

  function unsubscribe() {
    const keys = Object.keys(data);
    keys.forEach(filterDeadObserver);
  }

  function notify(key) {
    filterDeadObserver(key);
    getObservers(key).forEach((observer) => {
      observer.callback(data.get(key));
    });
  }

  function getData(key) {
    validateDataKey(key);
    return data.get(key);
  }

  function setData(key, newData, options = { rerender: true }) {
    data.set(key, newData);
    if (options.rerender) notify(key);
  }

  return {
    initStore,
    subscribe,
    unsubscribe,
    getData,
    setData,
  };
})();

export default store;
