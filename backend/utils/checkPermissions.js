const checkPermissions = async (req, res, next) => {
  const { user } = res.locals;

  try {
    if (user.role.description === 'executive') {
      res.locals.user = user;
      next();
    } else {
      res.status(401).json({ response: 'not allowed to post', success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

export default authenticateRole;
