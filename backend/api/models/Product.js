/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'string',
      columnName: '_id'  // Bắt buộc khi dùng MongoDB
    },

    name: {
      type: 'string',
      required: true
    },

    price: {
      type: 'number',
      required: true
    }
  },

};

