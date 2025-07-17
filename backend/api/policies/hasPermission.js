const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('[hasPermission] Thiếu token');
      return res.status(401).json({ message: 'Thiếu token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, 'secret');
    console.log('[hasPermission] Token decoded:', decoded);

    const user = await User.findOne({ id: decoded.id }).populate('roles');
    if (!user) {
      console.log('[hasPermission] User không tồn tại:', decoded.id);
      return res.status(401).json({ message: 'User không tồn tại' });
    }

    console.log('[hasPermission] User:', user);

    const roleIds = user.roles.map(r => r.id);
    const rolesWithPermissions = await Role.find({ id: roleIds }).populate('permissions');
    const permissions = rolesWithPermissions.flatMap(role =>
      role.permissions.map(p => p.action)
    );

    console.log('[hasPermission] Permissions của user:', permissions);

    const requiredPermission = req.options.permission;
    console.log('[hasPermission] Quyền yêu cầu:', requiredPermission);

    if (!requiredPermission || permissions.includes(requiredPermission)) {
      console.log('[hasPermission] ✅ Có quyền, cho phép tiếp tục');
      return proceed();
    }

    console.log('[hasPermission] ❌ Không có quyền');
    return res.forbidden({ message: 'Bạn không có quyền truy cập' });

  } catch (err) {
    console.log('[hasPermission] Lỗi xác thực:', err);
    return res.status(401).json({ message: 'Token không hợp lệ', error: err.message });
  }
};
