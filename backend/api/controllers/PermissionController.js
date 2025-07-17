/**
 * PermissionController
 *
 * @description :: Server-side logic for managing permissions
 */

module.exports = {
  // Tạo permission mới
  create: async function (req, res) {
    try {
      const { action, description } = req.body;
      if (!action) return res.badRequest({ message: 'Thiếu action' });
      if (!description) return res.badRequest({ message: 'Thiếu mô tả' });

      const permission = await Permission.create({ action, description }).fetch();
      return res.json(permission);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Lấy tất cả permission
  getAll: async function (req, res) {
    try {
      const permissions = await Permission.find();
      return res.json(permissions);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Lấy 1 permission theo id
  getById: async function (req, res) {
    try {
      const permission = await Permission.findOne({ id: req.params.id });
      if (!permission) return res.notFound({ message: 'Không tìm thấy permission' });
      return res.json(permission);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Cập nhật permission
  update: async function (req, res) {
    try {
      const { action } = req.body;
      const updated = await Permission.updateOne({ id: req.params.id }).set({ action });
      if (!updated) return res.notFound({ message: 'Không tìm thấy permission' });
      return res.json(updated);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Xóa permission
  delete: async function (req, res) {
    try {
      const deleted = await Permission.destroyOne({ id: req.params.id });
      if (!deleted) return res.notFound({ message: 'Không tìm thấy permission' });
      return res.json({ message: 'Đã xóa permission' });
    } catch (err) {
      return res.serverError(err);
    }
  }
};
