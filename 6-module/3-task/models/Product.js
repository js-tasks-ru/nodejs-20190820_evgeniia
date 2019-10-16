const mongoose = require('mongoose');
const connection = require('../libs/connection');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  subcategory: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  images: [String],

});

<<<<<<< HEAD
productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
  },
});

productSchema.index(
    {title: 'text', description: 'text'},
    {default_language: 'russian',
      weights: {
        title: 10,
        description: 5,
      },
      name: 'TextSearchIndex',
    },
=======
productSchema.index(
    {title: 'text', description: 'text'},
    {
      weights: {title: 10, description: 5},
      default_language: 'russian',
      name: 'TextSearchIndex',
    }
>>>>>>> 578e2fd33542e71f530c48322c22d1afa0caf48b
);

module.exports = connection.model('Product', productSchema);
