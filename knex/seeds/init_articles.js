exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles').del()
    .then(function () {
      // Inserts seed entries
      return knex('articles').insert([
        { title: 'The Lone Wolf', body: 'A lone wolf is an animal or person that generally lives or spends time alone instead of with a group.', author: 'wikipedia' },

        { title: '2009', body: "I don't need to lie no more, Nowadays all I do is shine, take a breath and ease my mind", author: "Mac Miller" },

        { title: 'You Fit Into Me', body: 'you fit into me, like a hook into an eye, a fish hook, an open eye', author: 'Margaret Atwood' }
      ]);
    });
};