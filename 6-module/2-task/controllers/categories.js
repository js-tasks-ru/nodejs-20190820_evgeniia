const Category = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx, next) {
  let categories = await Category.find({});
  if (categories.length) {
    ctx.body = { categories };
  }
  else {
    ctx.body = { categories: [] };
  }
  ctx.status = 200;
};
