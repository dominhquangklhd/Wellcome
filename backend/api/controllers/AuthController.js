/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  signup: async (req, res) => {
    const { email, password } = req.body;
    const newUser = await User.create({ email, password }).fetch();
    return res.json({ message: 'Tạo tài khoản thành công', user: newUser });
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });

    const bcrypt = require('bcrypt');
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Sai mật khẩu' });

    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });
    return res.json({ token });
  },
};
