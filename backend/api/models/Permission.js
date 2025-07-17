/**
 * Permission.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

// api/models/Permission.js
module.exports = {
  attributes: {
    action: { type: 'string', required: true, unique: true },
    description: { type: 'string', required: true },
    roles: {
      collection: 'role',
      via: 'permissions'
    }
  }
};
