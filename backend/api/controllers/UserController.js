// api/controllers/UserController.js
module.exports = {
  assignRole: async function (req, res) {
    try {
      const { userId, roleId } = req.body;

      // Kiểm tra tồn tại user và role
      const user = await User.findOne({ id: userId });
      const role = await Role.findOne({ id: roleId });

      if (!user || !role) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy user hoặc role" });
      }

      // Gán role
      await User.addToCollection(userId, "roles").members([roleId]);

      return res.ok({ message: "Gán role thành công" });
    } catch (err) {
      return res.serverError(err);
    }
  },

  removeRole: async function (req, res) {
    const { userId, roleId } = req.body;

    const user = await User.findOne({ id: userId });
    const role = await Role.findOne({ id: roleId });

    if (!user || !role) return res.notFound();

    await User.removeFromCollection(userId, "roles").members([roleId]);
    return res.json({ message: "Gỡ role thành công" });
  },

  replaceRoles: async function (req, res) {
    const { userId, roleIds } = req.body; // roleIds: array of roleId

    const user = await User.findOne({ id: userId });
    if (!user) return res.notFound();

    await User.replaceCollection(userId, "roles").members(roleIds);
    return res.json({ message: "Gán lại role thành công" });
  },

  getById: async function (req, res) {
    const user = await User.findOne({ id: req.params.id }).populate('roles');
    if (!user) return res.notFound({ message: 'Không tìm thấy user' });
    return res.json(user);
  },

  getAll: async function (req, res) {
    const users = await User.find().populate('roles');
    return res.json(users);
  },
};
