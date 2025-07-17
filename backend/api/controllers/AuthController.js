/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
/* eslint-env node, es6 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Hash mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo user
      const newUser = await User.create({
        email,
        password: hashedPassword,
      }).fetch();

      // Tìm role mặc định (ví dụ role có name là 'user')
      const defaultRole = await Role.findOne({ name: "user" });
      if (!defaultRole) {
        return res.status(500).json({ message: "Role mặc định không tồn tại" });
      }

      // Gán role cho user
      await User.addToCollection(newUser.id, "roles").members([defaultRole.id]);

      return res.json({ message: "Tạo tài khoản thành công", user: newUser });
    } catch (error) {
      return res.serverError(error);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('[LOGIN] Nhận email:', email, 'password:', password);

      const user = await User.findOne({ email }).populate('roles');
      if (!user) {
        console.log('[LOGIN] Không tìm thấy user');
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }

      console.log('[LOGIN] User từ DB:', user);

      const match = await bcrypt.compare(password, user.password);
      console.log('[LOGIN] So sánh mật khẩu:', match);

      if (!match) {
        return res.status(401).json({ message: 'Sai mật khẩu' });
      }

      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

      const roleIds = user.roles.map((r) => r.id);
      const rolesWithPermissions = await Role.find({ id: roleIds }).populate(
        'permissions'
      );

      const permissions = rolesWithPermissions.flatMap((role) =>
        role.permissions.map((p) => p.action)
      );
      const uniquePermissions = [...new Set(permissions)];

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          roles: user.roles.map((r) => r.name),
          permissions: uniquePermissions,
        },
      });
    } catch (err) {
      console.error('[LOGIN] Lỗi xảy ra:', err);
      return res.serverError(err);
    }
  },

};
