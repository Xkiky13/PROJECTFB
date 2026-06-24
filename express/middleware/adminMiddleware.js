const adminMiddleware = (req, res, next) => {
  try {
    // Pastikan user sudah di-set oleh authMiddleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak ditemukan'
      });
    }

    // Cek apakah user adalah admin (role_id = 1)
    if (req.user.role_id !== 1) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.'
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error checking admin permission'
    });
  }
};

module.exports = adminMiddleware;
