exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        { name: 'Ferrari', price: 220000, inventory: 10 },
        { name: 'Lamborgini', price: 200000, inventory: 5 },
        { name: 'Porsche', price: 120000, inventory: 13 }
      ]);
    });
};