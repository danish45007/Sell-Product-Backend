const User = require("../Models/user")


exports.signup = (req,res) => {
    const user = new User(req.body)
    user.save((err,user) => {
        if(err){
            return res.status(400).json({
                err: "Unable to save user to DB"
            })

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

