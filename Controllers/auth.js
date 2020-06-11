const User = require("../Models/user")
const {check,validationResult} = require('express-validator')

exports.signup = (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0],
            param: errors.array()[2]
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




















exports.signout= (req,res) => {
    res.json({
        message: "User signout"
    });

};

