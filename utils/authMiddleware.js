const authMiddleware = (req, res, next) => {
  console.log(req.session)
  if (req.session.user) {
    next();
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
