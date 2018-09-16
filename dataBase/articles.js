class Articles {
  constructor() {
    this.knex = require('../knex/knex.js')
    this._count = 1;
    this._storage = [];
    this.add({
      title: 'Test article 1',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dapibus mi vel augue bibendum, eget varius magna vestibulum. Curabitur bibendum est malesuada nisi fringilla facilisis. Sed at dapibus neque. Pellentesque vel risus et massa consequat hendrerit et a lorem. Fusce tincidunt rhoncus consequat. Quisque ultricies, felis vel cursus pulvinar, ante quam consectetur nisi, sed eleifend quam sem id erat. Nulla a lacus ullamcorper, finibus elit non, facilisis mi. Nulla mollis massa id enim placerat feugiat. Phasellus at hendrerit lectus, ut tristique magna. Nulla vitae pretium nisl. Morbi eu nunc ut nibh faucibus tempor. Sed sed risus nulla.',
      author: 'Yo mama'

    });
  }
  all() {
    return this.knex.raw('SELECT * FROM items')
  }
  getItemById(id) {
    return this._storage.filter(item => id == item.id)[0];
  }
  add(item) {
    item.id = this._count;
    this._storage.push(item);
    this._count++;
  }
  updateItemById(id) {
    let getItem = this._storage.filter(element => id == element.id)[0];
    return getItem;
  }

  deleteArticleById(id) {
    let removedArticle = null;
    this._storage.forEach((element, index) => {
      if (element.id === Number(id)) {
        removedArticle = this._storage.splice(index, 1);
      }
    });
    return removedArticle;
  }
}

module.exports = Articles;