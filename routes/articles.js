//~~~~~~~~~~~~~~ ARTICLES ~~~~~~~~~~~~~~//

const express = require('express');
const Router = express.Router();

//Gets add() from .js
const Articles = require('../dataBase/articles.js');
const DS_Inv2 = new Articles(); // articles.js add()
const knex = require('../knex/knex.js')


//this will render all the articles
Router.get('/', (req, res) => {
  DS_Inv2.all()
    .then(results => {
      const items = results.rows
      res.render('articles', { items });
    })
    .catch(err => {
      console.log('error', err)
    })
})


//this will render out the form to add articles to the list
Router.get('/new', (req, res) => {
  res.render('add-articles-form');
})

//this will render out the detail of the articles by the id of the item
Router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log('req.params: ', req.params)

  knex.raw(`SELECT * FROM articles WHERE id = ${id}`)
    .then(result => {
      const item = result.rows[0]
      res.render('articleInfo', item);
    })
    .catch(err => {
      console.log('error', err)
    })
})


//add article to the inventory (this refrences the "New Articles" link that leads to the add-article-form.hbs)
Router.post('/', (req, res) => {
  console.log('req.body: ', req.body);
  const artItem = req.body;
  knex.raw(`INSERT INTO articles (title, body, author) VALUES ('${artItem.title}', '${artItem.body}', '${artItem.author}')`)
    .then(result => {
      res.redirect('/articles');
    })
    .catch(err => {
      console.log('error', err)
      res.redirect('/products')
    })
})


//Find the article in storage and DELETE it 
Router.delete("/:id", (req, res) => {
  const { id } = req.params;

  knex.raw(`DELETE FROM articles WHERE id = ${id}`)
    .then(result => {
      const item = result.rows[0]
      res.redirect('/articles');
    })
    .catch(err => {
      console.log('error', err)
      res.redirect('/articles')
    })
});


// edits the item selected to change the item

// EDIT THE CHOSEN 
Router.get('/:id/edit', (req, res) => {
  const { id } = req.params;

  knex.raw(`SELECT * FROM articles WHERE id = ${id}`)
    .then(result => {
      const article = result.rows[0]
      res.render(`edit`, { article })
    })
    .catch(err => {
      console.log('error', err)
      res.redirect('/articles')
    })
})

Router.put('/:id/', (req, res) => {
  const { id } = req.params;

  knex('articles').where({ id: id }).update({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author
  })
    .then(() => {
      res.redirect(`/articles/${id}`);
    })
    .catch(err => {
      console.log('error', err)
      res.redirect('/articles')
    })
})

module.exports = Router;




//~~~~~~~~~~~~~~ OLD ARTICLES ~~~~~~~~~~~~~~//

// const express = require('express');
// const Router = express.Router();

// //Gets add() from .js
// const Articles = require('../dataBase/articles.js');
// const DS_Inv2 = new Articles(); // articles.js add()


// //this will render all the articles
// Router.get('/', (req, res) => {
//   const items = DS_Inv2.all();
//   // console.log('articles: ', items);
//   res.render('articles', { items });
// })

// //this will render out the form to add articles to the list
// Router.get('/new', (req, res) => {
//   res.render('add-articles-form');
// })

// //this will render out the detail of the articles by the id of the item
// Router.get('/:id', (req, res) => {
//   const { id } = req.params;
//   const item = DS_Inv2.getItemById(id);
//   // console.log('item: ', item);
//   res.render('articleInfo', item);
// })

// //add article to the inventory (this refrences the "New Articles" link that leads to the add-article-form.hbs)
// Router.post('/', (req, res) => {
//   console.log('req.body: ', req.body);
//   const artItem = req.body;
//   DS_Inv2.add(artItem);
//   res.redirect('/articles');

// })

// //Find the article in storage and DELETE it 
// Router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   // console.log(req.params);
//   DS_Inv2.deleteArticleById(id);
//   res.redirect('/articles');
// });

// // edits the item selected to change the item
// Router.get('/:id/edit', (req, res) => {
//   const { id } = req.params;
//   const article = DS_Inv2.updateItemById(id);
//   res.render('edit', { article })
// })

// Router.put('/:id/', (req, res) => {
//   const { id } = req.params;
//   const article = DS_Inv2.updateItemById(id);
//   const newInfo = req.body;

//   if (article.title !== newInfo.title) {
//     article.title = newInfo.title;
//   }
//   if (article.body !== newInfo.body) {
//     article.body = newInfo.body
//   }
//   if (article.author !== newInfo.author) {
//     article.author = newInfo.author;
//   }
//   res.redirect(`/articles/${id}`);
// })

// module.exports = Router;



