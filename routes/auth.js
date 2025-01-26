const experss = require("express");
const router = experss.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')

const {
  User,
  VaildateLoginUser,
  VaildateRegisterUser,
} = require("../models/User");

/**
 *@description User Register
 *@route /api/auth/register
 *@method POST
 *@access public
 */
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { error } = VaildateRegisterUser(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ msg: "Already Registed" });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });

    const result = await user.save();

    //generaye Token
    const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_Secrete_Key,{expiresIn:'4d'});
    const {password,...other}=result._doc;

    res.status(201).json({...other,token});
  })
);



/**
 *@description User Login
 *@route /api/auth/login
 *@method POST
 *@access public
 */
 router.post(
    "/login",
    asyncHandler(async (req, res) => {
      const { error } = VaildateLoginUser(req.body);
      if (error) {
        return res.status(400).json({ msg: error.details[0].message });
      }
  
      let user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(400).json({ msg: "Invalid Email or Password" });
      }
  
     
      const isPassMatch=await bcrypt.compare(req.body.password,user.password);

      if(!isPassMatch){
        return res.status(400).json({mgs:'Invalid Email or Password'})
      }
      //generate Token
      const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_Secrete_Key,{expiresIn:'4d'});

      const {password,...other}=user._doc;
  
      res.status(200).json({...other,token});
    })
  );
  

module.exports = router;
