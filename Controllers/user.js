const User = require('../Models/user');


// middleware to get user for user specific Id
exports.getUserById = (req,res,next,id) => {
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json(
                    { error: "No user found in DB" }
                )
        }
        req.profile = user;
        next();
    })
}

// Get the User
exports.getUser = (req,res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile)
}

// Get all Users
exports.getUsers = (req,res) => {
    User.find().exec((err,users) => {
        if(err || !users){
            return res.status(400).json(
                    { error: "No Users in DB" }
                )
        }
        res.json(users)
    }) 
}