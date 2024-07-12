const router = require('express').Router();
const {SignUp,login}=require("../controllers/user.controller")
router.post('/signup',SignUp);
router.post('/login',login);
module.exports=router;