module.exports = async function (req, res, proceed) {
  const jwt = require('jsonwebtoken');
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Không có token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'secret'); // 'secret' nên đưa vào .env
    req.user = decoded;
    return proceed();
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
};