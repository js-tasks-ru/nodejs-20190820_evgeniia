const mongoose = require('mongoose');
const Product = require('../models/Product');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  if (ctx.query && mongoose.Types.ObjectId.isValid(ctx.query.subcategory)) {
    let products = await Product.find({ subcategory: ctx.query.subcategory });
    if (!products) {
      ctx.status = 404;
      ctx.body = { products: [] };
      return;
    }
    else {
      ctx.status = 200;
      ctx.body = { products };
    }
    return next();
  }
  else {
    ctx.status = 400;
    return false;
  }
};

module.exports.productList = async function productList(ctx, next) {
  let products = await Product.find({});
  if (products) {
    ctx.status = 200;
    ctx.body = { products };
  }
  else {
    ctx.status = 404;
  }
  next();
};

module.exports.productById = async function productById(ctx, next) {
  if (ctx.query && mongoose.Types.ObjectId.isValid(ctx.query.id)) {
    let product = await Product.findById(ctx.query.id);
    if (!product) {
      ctx.status = 404;
      ctx.body = 'Not found';
      return;
    }
    else {
      ctx.status = 200;
      ctx.body = { product };
    }
    return next();
  }
  else {
    ctx.status = 400;
    return false;
  }

};

