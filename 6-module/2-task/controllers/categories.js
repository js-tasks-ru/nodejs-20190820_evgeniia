const Category = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx, next) {
  let categories = await Category.find({});
  if (categories) {
    ctx.status = 200;
    ctx.body = { categories };
  }
  else {
    ctx.status = 404;
    ctx.body = { categories: [] };
  }
  next();
};
