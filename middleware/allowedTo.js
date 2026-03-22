import appError from "../utils/appError.js";

export default (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(appError.create("this role is not authorized", 401));
    }
    next();
  };
};
