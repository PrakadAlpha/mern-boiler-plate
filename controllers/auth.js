const asyncHandlers = require('../middleware/async');
const User = require('../models/User');

exports.register = asyncHandlers(async (req, res, next) => {

  const {name, email, password, role}  = req.body;
  
  if(!email || !password){
    return res.status(400).json({success: false, message: "Please enter all the fields."});
  }
  
  let user = await User.findOne({email});
  

  if(user){
    return res.status(400).json({success: false, message: 'User already exists'});
  }

  user = await User.create({
    name, email, password, role
  });

  const token = user.getSignedJwtToken();

  res.status(200)
     .json({success: true, token: token});
}) 

exports.login = asyncHandlers(async (req, res, next) => {

  const {email, password}  = req.body;

  if(!email || !password){
    return res.status(400).json({success: false, message: "Please enter all the fields."});
  }
  
  const user = await User.findOne({email}).select('+password');

  if(!user){
    return res.status(404).json({success: false, message: "Invalid Creds.."});
  }

  const isMatch = await user.verifyPassword(password);

  if(!isMatch){
    return res.status(404).json({success: false, message: "Invalid Creds.."});
  }

 const token = user.getSignedJwtToken();

 return res.status(200)
     .json({success: true, token: token});

}) 

exports.getMe = asyncHandlers(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  return res.status(200).json({success: true, data: user});
})
