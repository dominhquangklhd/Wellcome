/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
const bcrypt = require('bcrypt');

module.exports.bootstrap = async function (done) {
  const Role = sails.models.role;
  const Permission = sails.models.permission;

  try {
    sails.log.info('🔐 [RBAC] Bắt đầu seed role & permission...');

    const permissionList = [
      { action: 'view_product', description: 'Xem sản phẩm' },
      { action: 'add_product', description: 'Thêm sản phẩm' },
      { action: 'edit_product', description: 'Chỉnh sửa sản phẩm' },
      { action: 'delete_product', description: 'Xóa sản phẩm' },
      { action: 'manage_roles', description: 'Quản lý vai trò' },
      { action: 'manage_permissions', description: 'Quản lý quyền' },
      { action: 'view_user', description: 'Xem danh sách user' },
      { action: 'edit_user', description: 'Chỉnh sửa user' },
    ];

    for (const perm of permissionList) {
      const exists = await Permission.findOne({ action: perm.action });
      if (!exists) {
        await Permission.create(perm);
        sails.log.info(`✔️  Tạo permission: ${perm.action}`);
      }
    }

    const allPermissions = await Permission.find();

    const roles = [
      {
        name: 'admin',
        permissions: allPermissions.map(p => p.id),
      },
      {
        name: 'editor',
        permissions: allPermissions.filter(p =>
          ['view_product', 'add_product', 'edit_product'].includes(p.action)
        ).map(p => p.id),
      },
      {
        name: 'user',
        permissions: allPermissions.filter(p =>
          ['view_product'].includes(p.action)
        ).map(p => p.id),
      },
    ];

    for (const role of roles) {
      let roleRecord = await Role.findOne({ name: role.name });
      if (!roleRecord) {
        roleRecord = await Role.create({ name: role.name }).fetch();
        sails.log.info(`✔️  Tạo role: ${role.name}`);
      }

      await Role.replaceCollection(roleRecord.id, 'permissions').members(role.permissions);
    }

    sails.log.info('✅ [RBAC] Hoàn tất seed Role & Permission.');

    sails.log.info('🔑 [RBAC] Bắt đầu tạo user admin mặc định...');
    // Tạo user admin mặc định
    const User = sails.models.user;
    // await User.destroy({}); // Xoá tất cả user trước khi tạo mới

    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('123456', 10);

      const newAdmin = await User.create({
        email: 'admin@example.com',
        password: hashedPassword,
      }).fetch();

      const adminRole = await Role.findOne({ name: 'admin' });
      if (adminRole) {
        await User.addToCollection(newAdmin.id, 'roles').members([adminRole.id]);
        sails.log.info('👑 Tạo user admin mặc định: admin@example.com / 123456');
      }
    }
    return done();
  } catch (err) {
    sails.log.error('❌ Lỗi khi seed RBAC trong bootstrap:', err);
    return done(err);
  }
};

