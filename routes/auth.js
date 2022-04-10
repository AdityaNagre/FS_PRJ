const express = require('express');
const User = require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

//ROUTE 1: Create a user using : POST | api/auth/createuser | No Login Required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 2 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 3 })
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt= await bcrypt.genSalt(10);
    const hashedPwd=await bcrypt.hash(req.body.password,salt);
    const JWT_PWD_KEY='adilovesya'
    try {
    const user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPwd
      }).catch(err=> {
          return res.json({error:err.message})
      });
      const authtoken = jwt.sign({id: user.id}, JWT_PWD_KEY);
      return res.send(authtoken)
    } catch (error) {
      return res.status(500).send("Internal Server Error")
    }
})

//ROUTE 2
router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','Password cannot be empty').exists()
],async (req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const JWT_PWD_KEY='adilovesya'
    const {email, password}=req.body;
    try {
    const user=await User.findOne({email})
    if(!user){
      return res.status(400).send("Enter valid credentials");
    }
    const isPwd=await bcrypt.compare(password, user.password);
    if(!isPwd){
      return res.status(400).send("Enter valid credentials1");
    }
    const authtoken = jwt.sign({id: user.id}, JWT_PWD_KEY);
    res.send(authtoken)
    } catch (error) {
      return res.status(500).send("Internal Server Errors")
    }
})

//ROUTE 3
router.post('/getuser',fetchuser,async (req,res)=>{
  try {
    const userId=req.id;
    const userdata=await User.findById(userId).select("-password")
    res.send(userdata)
  } catch (error) {
    return res.status(500).json({error:error.message})
  }
})


module.exports=router
