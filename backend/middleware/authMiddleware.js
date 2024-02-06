import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// User must be authenticated
const protect = asyncHandler(async (req, res, next) =>
{
  let token;

  // Read JWT from the 'Authorization' header
  const authHeader = req.headers.authorization;
  console.log("authHeader===>", authHeader)
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // Extract the token from the "Bearer" token format
    token = authHeader.split(' ')[1];

  }



  if (token) {
    try {

      const decoded = jwt.verify(token, "abc123");
      console.log("decoded===>", decoded)
      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// User must be an admin
const admin = (req, res, next) =>
{


  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
