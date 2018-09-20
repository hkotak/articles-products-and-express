//~~~~~~~~~~~~~~ PRODUCTS ~~~~~~~~~~~~~~//

const express = require('express');
// const winston = require('winston');
const Router = express.Router();

// const logger = winston.createLogger({
//   level: 'info',
//   transports: [
//     new winston.transports.Console()
//   ]
// })

//this goes in one of the routes
// logger.info('SQL QUERY SUCCESSFUL');


//Gets add() from .js
const Products = require('../dataBase/products.js');
const DS_Inv = new Products(); // products.js add()
const knex = require('../knex/knex.js')


//THIS WILL RENDER ALL THE PRODUCTS
Router.get('/', (req, res) => {
  DS_Inv.all()
    .then(results => {
      const items = results.rows
      res.render('products', { items })
    })
    .catch(err => {
      console.log('error', err)
    })
});

//this will render out the form to get the products to add to the list    
Router.get('/new', (req, res) => {
  res.render('add-products-form');
})


//this will render out the detail of the products by the id of the item
Router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log('prod req.param: ', req.params);

  knex.raw(`SELECT * FROM products WHERE id = '${id}'`)
    .then(result => {
      const item = result.rows[0]
      res.render('detail', item)
    })
    .catch(err => {
      console.log('error', err)
    })
})

//add item to the inventory (this refrences the "New products" link that leads to the add-item-form.hbs)
Router.post('/', (req, res) => {
  console.log('req.body: ', req.body);
  const item = req.body;
  knex.raw(`INSERT INTO products (name, price, inventory) VALUES ('${item.name}', '${item.price}', '${item.inventory}')`)
    .then(result => {
      res.redirect('/products');
    })
    .catch(err => {
      console.log('error', err)
      res.redirect('/products')
    })
})

//Find the product in storage and DELETES 
Router.delete("/:id", (req, res) => {
  const { id } = req.params;

  knex.raw(`DELETE FROM products WHERE id = ${id}`)
    .then(result => {
      const item = result.rows[0]
      res.redirect('/products');
    })
    .catch(err => {
      console.log('error', err)
      res.redirect('/products')
    })
});

// EDIT THE CHOSEN 
Router.get('/:id/edit', (req, res) => {
  const { id } = req.params;
  console.log('WTH: ', req.params);

  knex.raw(`SELECT * FROM products WHERE id = ${id}`)
    .then(result => {
      const product = result.rows[0]
      console.log('are we pulling this: ', product);
      res.render(`edit`, { product })
    })
    .catch(err => {
      console.log('error', err)
      res.redirect('/products')
    })
})

Router.put('/:id/', (req, res) => {
  const { id } = req.params;

  knex('products').where({ id: id }).update({
    name: req.body.name,
    price: req.body.price,
    inventory: req.body.inventory
  })
    .then(() => {
      res.redirect(`/products/${id}`);
    })
    .catch(err => {
      console.log('error', err)
      res.redirect('/products')
    })
})


module.exports = Router;



//~~~~~~~~~~~~~~~~~~~ OLD PRODUCTS ~~~~~~~~~~~~~~~~~~~//

// const express = require('express');
// const Router = express.Router();

// //Gets add() from .js
// const Products = require('../dataBase/products.js');
// const DS_Inv = new Products(); // products.js add()



// //THIS WILL RENDER ALL THE PRODUCTS
// Router.get('/', (req, res) => {
//   const items = DS_Inv.all();
//   // console.log('products: ', items);
//   res.render('products', { items });
// })

// //this will render out the form to get the products to add to the list    
// Router.get('/new', (req, res) => {
//   res.render('add-products-form');
// })

// //this will render out the detail of the products by the id of the item
// Router.get('/:id', (req, res) => {
//   const { id } = req.params;
//   const item = DS_Inv.getItemById(id);
//   // console.log('item: ', item);
//   res.render('detail', item);
// })

// //add item to the inventory (this refrences the "New products" link that leads to the add-item-form.hbs)
// Router.post('/', (req, res) => {
//   console.log('req.body: ', req.body);
//   const item = req.body;
//   DS_Inv.add(item);
//   res.redirect('/products');
// })

// //Find the product in storage and DELETES 
// Router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   // console.log(req.params);
//   DS_Inv.deleteItemById(id);
//   res.redirect('/products');
// });

// // edits the item selected to change the item
// Router.get('/:id/edit', (req, res) => {
//   const { id } = req.params;
//   const product = DS_Inv.updateItemById(id);
//   res.render('edit', { product })
// })

// Router.put('/:id/', (req, res) => {
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
//   res.redirect(`/${id}`);
// })

// module.exports = Router;