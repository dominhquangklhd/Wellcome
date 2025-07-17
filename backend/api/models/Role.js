// api/models/Role.js
module.exports = {
  attributes: {
    name: { type: 'string', required: true, unique: true },

    permissions: {
      collection: 'permission',
      via: 'roles'
    },
    users: {
      collection: 'user',
      via: 'roles'
    }
  }
};
