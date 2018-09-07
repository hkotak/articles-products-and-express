class Products {
  constructor() {
    this._count = 1;
    this._storage = [];
    this.add({
      name: 'Test item 1',
      price: 100.00,
      inventory: 22
    });
  }
  all() {
    return [...this._storage];
  }
  getItemById(id) {
    return this._storage.filter(item => id == item.id)[0];
  }
  add(item) {
    item.id = this._count;
    this._storage.push(item);
    this._count++;
    // console.log('updated productStoreage: ', this._storage)
  }
  updateItemById(id) {
    let getItem = this._storage.filter(element => id == element.id)[0];
    return getItem;
  }

  deleteItemById(id) {
    let removedProduct = null;
    this._storage.forEach((element, index) => {
      if (element.id === Number(id)) {
        removedProduct = this._storage.splice(index, 1);
      }
    });
    return removedProduct;
  }
}

module.exports = Products;