const User=require("../models/UserModel")
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv=require("dotenv")
dotenv.config();
module.exports.SignUp=async(req,res)=>{
    const {username, email, password} = req.body;
    const hashedPassword = await bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username, email, password: hashedPassword
    });
    try {
        await newUser.save();
        console.log('New User created');
        res.status(200).json({
            statuCode:200,
            user:newUser
        }); 
        
    } catch (error) {
        console.log('Error Signing Up', error.message);
        if (!err.message.includes("E11000")) {     
            return res.status(500).json({message: err})
        } else {
            return res.status(409).send("Error: Email already in use");
        }
    }
}

module.exports.login=async(req,res)=>{
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email: email});
        console.log('validuser is',validUser);
        if(!validUser){
            return res.status(404).json({message: 'User not found'});
        }
        const validPassword = await bcryptjs.compare(password, validUser.password);
        if(!validPassword){
            return res.status(401).json({message: 'Invalid Credentials'});
        }
        const {_id, password: hashedPassword, ...userInfo} = validUser._doc;
        const token = jwt.sign({id: _id}, process.env.JWT_SECRET_KEY);
        console.log('Generated token', token); 
        console.log('userInfo : ', userInfo);
        return res.cookie('jwt', token, {httpOnly: true}).status(200).json({token: token, user: validUser._doc});

    } catch (error) {
        console.log('Error Signing In', error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }

}