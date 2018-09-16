const express = require('express');
const app = express();
const bp = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
const Products = require('./routes/products.js');
const Articles = require('./routes/articles.js');

const knex = require('./knex/knex.js')


//MIDDLEWARE
app.use(express.static('public'));
app.use(bp.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');


app.get('/', (req, res) => {
  res.render('home')
});


//app.use WILL INCORPORATE THE ROUTER
app.use('/products', Products);
app.use('/articles', Articles);


// tells the app to listen upon the called server
app.listen(process.env.EXPRESS_CONTAINER_PORT, () => {
  console.log(`Started app on port: ${process.env.EXPRESS_CONTAINER_PORT}`);
});





//~~~~~~~~~~~~~~ WITHOUT ROUTER BELOW ~~~~~~~~~~~~~~//


//~~~~~~~~~~~~~~ PRODUCTS ~~~~~~~~~~~~~~//

// //this will render all the products
// app.get('/products', (req, res) => {
//   const items = DS_Inv.all();
//   console.log('products: ', items);
//   res.render('products', { items });
// })

// //this will render out the form to get the products to add to the list    
// app.get('/products/new', (req, res) => {
//   res.render('add-products-form');
// })

// //this will render out the detail of the products by the id of the item
// app.get('/products/:id', (req, res) => {
//   const { id } = req.params;
//   const item = DS_Inv.getItemById(id);
//   // console.log('item: ', item);
//   res.render('detail', item);
// })

// //add item to the inventory (this refrences the "New products" link that leads to the add-item-form.hbs)
// app.post('/products', (req, res) => {
//   console.log('req.body: ', req.body);
//   const item = req.body;
//   DS_Inv.add(item);
//   res.redirect('/products');
// })

// //Find the product in storage and DELETES 
// app.delete("/products/:id", (req, res) => {
//   const { id } = req.params;
//   // console.log(req.params);
//   DS_Inv.deleteItemById(id);
//   res.redirect('/products');
// });

// // edits the item selected to change the item
// app.get('/products/:id/edit', (req, res) => {
//   const { id } = req.params;
//   const product = DS_Inv.updateItemById(id);
//   res.render('edit', { product })
// })

// app.put('/products/:id/', (req, res) => {
//   const { id } = req.params;
//   const product = DS_Inv.updateItemById(id);
//   const newInfo = req.body;

//   if (product.name !== newInfo.name) {
//     product.name = newInfo.name;
//   }
//   if (product.price !== newInfo.price) {
//     product.price = newInfo.price
//   }
//   if (product.inventory !== newInfo.inventory) {
//     product.inventory = newInfo.inventory;
//   }
//   res.redirect(`/products/${id}`);
// })


// //~~~~~~~~~~~~~~ ARTICLES ~~~~~~~~~~~~~~//

// //this will render all the articles
// app.get('/articles', (req, res) => {
//   const items = DS_Inv2.all();
//   // console.log('articles: ', items);
//   res.render('articles', { items });
// })

// //this will render out the form to add articles to the list
// app.get('/articles/new', (req, res) => {
//   res.render('add-articles-form');
// })

// //this will render out the detail of the articles by the id of the item
// app.get('/articles/:id', (req, res) => {
//   const { id } = req.params;
//   const item = DS_Inv2.getItemById(id);
//   // console.log('item: ', item);
//   res.render('articleInfo', item);
// })

// //add article to the inventory (this refrences the "New Articles" link that leads to the add-article-form.hbs)
// app.post('/articles', (req, res) => {
//   console.log('req.body: ', req.body);
//   const artItem = req.body;
//   DS_Inv2.add(artItem);
//   res.redirect('/articles');

// })

// //Find the article in storage and DELETE it 
// app.delete("/articles/:id", (req, res) => {
//   const { id } = req.params;
//   // console.log(req.params);
//   DS_Inv2.deleteArticleById(id);
//   res.redirect('/articles');
// });

// // edits the item selected to change the item
// app.get('/articles/:id/edit', (req, res) => {
//   const { id } = req.params;
//   const article = DS_Inv2.updateItemById(id);
//   res.render('edit', { article })
// })

// app.put('/articles/:id/', (req, res) => {
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



// // tells the app to listen upon the called server
// app.listen(process.env.PORT, () => {
//   console.log(`Starting app on port: ${process.env.PORT}`);
// });


