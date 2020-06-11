require('dotenv').config();
const User = require("../Models/user");
const {check,validationResult} = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');



// Signup method  
exports.signup = (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({ 
            error: [errors.array()[0].msg, errors.array()[0].param]
        })
    }
    const user = new User(req.body)
    user.save((err,user) => {
        if(err){
            return res.status(400).json({
                err: "Unable to save user to DB"
            });

        } else{
            res.json(user)
        }
    }) 
};


// signin method
exports.signin = (req, res) => {
    const errors = validationResult(req)
    const {email, password} = req.body;
    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            error: [errors.array()[0].msg, errors.array()[0].param]    
        })
        
    }
    User.findOne({email}, (err,user) => {
        
        // User not SignUp
        // Redirect User to SignUP
        if(err || !user){
            return res.status(400).json({
                error: "User does not Exist"

            })
        };
        // Auth Failed
        if(!user.authenticate(password)){

            return res.status(401).json({
                error: "Email and Password don't match"
            })
        }
        // True State
        // Token Created
        const token = jwt.sign({_id: user._id},process.env.SECRET)
        // Put Token in user browser Cookie
        res.cookie("token", token, {expire: new Date() + 9999})
        // send res to FrontEnd
        const {_id, name, email, role} = user;
        return res.json({token, user: {_id, name, email, role}})
    }) 
}



// Signout method
exports.signout= (req,res) => {
    res.json({
        message: "User signout"
    });

};

