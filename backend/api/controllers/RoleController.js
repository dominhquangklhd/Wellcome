module.exports = {
  create: async function (req, res) {
    try {
      const { name } = req.body;
      const role = await Role.create({ name }).fetch();
      return res.json(role);
    } catch (err) {
      return res.serverError(err);
    }
  },

  getAll: async function (req, res) {
    const roles = await Role.find().populate('permissions');
    return res.json(roles);
  },

  getById: async function (req, res) {
    const role = await Role.findOne({ id: req.params.id }).populate('permissions');
    if (!role) return res.notFound();
    return res.json(role);
  },

  update: async function (req, res) {
    const { name } = req.body;
    const updated = await Role.updateOne({ id: req.params.id }).set({ name });
    if (!updated) return res.notFound();
    return res.json(updated);
  },

  delete: async function (req, res) {
    const deleted = await Role.destroyOne({ id: req.params.id });
    if (!deleted) return res.notFound();
    return res.ok();
  },

  assignPermission: async function (req, res) {
    const { permissionId } = req.body;
    const roleId = req.params.id;

    const role = await Role.findOne({ id: roleId });
    const perm = await Permission.findOne({ id: permissionId });

    if (!role || !perm) return res.notFound();

    await Role.addToCollection(roleId, 'permissions').members([permissionId]);
    return res.ok({ message: 'Gán permission thành công' });
  },

  removePermission: async function (req, res) {
    const { permissionId } = req.body;
    const roleId = req.params.id;

    const role = await Role.findOne({ id: roleId });
    const perm = await Permission.findOne({ id: permissionId });

    if (!role || !perm) return res.notFound();

    await Role.removeFromCollection(roleId, 'permissions').members([permissionId]);
    return res.ok({ message: 'Gỡ permission thành công' });
  }
};
