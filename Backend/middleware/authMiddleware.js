const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token || token !== 'Bearer token_secreto') {
      return res.status(401).json({ message: 'Não autorizado' });
    }
    next();
  };
  
  module.exports = authMiddleware;
  