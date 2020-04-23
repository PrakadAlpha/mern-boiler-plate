const asyncHandlers = require('../middleware/async');
const User = require('../models/User');


// @Method: POST
// @Route : api/auth/register 
// @Desc  : Handling the user registration
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

  res.status(200).json({success: true, token: token});
}) 


// @Method: POST
// @Route : api/auth/login 
// @Desc  : Logging in the user
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

 return res.status(200).json({success: true, token: token});

}) 

// @Method: GET
// @Route : api/auth/me 
// @Desc  : Get the user on load if token available in browser
exports.getMe = asyncHandlers(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  return res.status(200).json({success: true, data: user});
})
