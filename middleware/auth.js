const jwt = require('jsonwebtoken');
const asyncHandlers = require('./async');
const User = require('../models/User');

exports.protect = asyncHandlers(async (req, res, next) => {

  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }
  // else if(req.cookies.token){
  //   token = req.cookies.token;
  // }
  if(!token){
    return res.status(401).json({success: false, data: "Not Authorized"});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({success: false, data: "Not Authorized"});
  }
})

// exports.authorize = (...roles) => {
//   return (req, res, next) => {
//     if(!roles.includes(req.user.role)){
//       return res.status(401).json({success: false, data: "Not Authorized"});
//     }
//     next();
//   }
// }