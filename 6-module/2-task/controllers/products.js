const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  if (ctx.query.subcategory && mongoose.Types.ObjectId.isValid(ctx.query.subcategory)) {
    let products = await Product.find({ subcategory: {'_id': ctx.query.subcategory} });
    ctx.res.statusCode = 200;
    if (products.length) {
      ctx.body = { products };
    }
    else {
      ctx.body = { products: [] };
    }
  }
  else {
    ctx.body = { products: [] };
  }
  next();
};

module.exports.productList = async function productList(ctx, next) {
  let products = await Product.find({});
  ctx.res.statusCode = 200;
  if (products.length) {
    ctx.body = { products };
  }
  else {
    ctx.body = { products: [] };
  }
  next();
};

module.exports.productById = async function productById(ctx, next) {
  if (ctx.params.id && mongoose.Types.ObjectId.isValid(ctx.params.id)) {
    let data = await Product.findOne({'_id': ctx.params.id});
    if (data) {
      ctx.res.statusCode = 200;
      ctx.body = { product: data };
    }
    else {
      ctx.res.statusCode = 404;
    }
  }
  else {
    ctx.res.statusCode = 400;
  }
};

