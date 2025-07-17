/**
 * User.js
 *
 * A user who can log in to this application.
 */
const bcrypt = require("bcrypt");

module.exports = {
  attributes: {
    id: {
      type: "string",
      columnName: "_id",
    },

    email: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
    },

    password: {
      type: "string",
      required: true,
      protect: true, // không tự động trả về khi gọi .find()
    },

    roles: {
      collection: 'role',
      via: 'users'
    }

    // Có thể thêm các trường khác nếu muốn
    // name: { type: 'string' },
    // role: { type: 'string', isIn: ['admin', 'user'], defaultsTo: 'user' },
  },
};
