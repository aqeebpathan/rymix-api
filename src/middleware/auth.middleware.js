import jwt from "jsonwebtoken";

import AppResponse from "../utils/AppResponse.js";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return AppResponse.error(res, "Unauthorized - no token provided", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return AppResponse.error(res, "Unauthorized - invalid token", 401);
    }

    req.userId = decoded.userId;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    next(error);
  }
};

export const requireAdmin = (req, res, next) => {
  try {
    if (req.userRole !== "admin") {
      return AppResponse.error(res, "Forbidden - Admin access only", 403);
    }
    next();
  } catch (error) {
    next(error);
  }
};
