const Product = require('../models/Product');
<<<<<<< HEAD

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  if (ctx.query.query) {
    const products = await Product.find(
        {$text: {$search: ctx.query.query}},
        {score: {$meta: 'textScore'}})
        .sort({score: {$meta: 'textScore'}}
        );

    ctx.body = {products: products};
    return;
  }

  ctx.body = {products: []};
=======
const mapProducts = require('../mappers/product');

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  const {query} = ctx.query;
  if (!query) return next();

  const products = await Product
      .find({$text: {$search: query}}, {score: {$meta: 'textScore'}})
      .sort({score: {$meta: 'textScore'}})
      .limit(20);
  ctx.body = {products: products.map(mapProducts)};
>>>>>>> 578e2fd33542e71f530c48322c22d1afa0caf48b
};
