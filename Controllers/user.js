const User = require('../Models/user');
const Order = require('../Models/order');


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

// Update the existing Users
exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(
        // getting the user id making request
        {_id: req.profile._id},
        // setting up value
        {$set: req.body},
        // Documentation
        {new: true, useFindAndModify: false},
        (err,user) => {
            if(err){
                return res.status(400).json({
                    error: "Unable to update the user"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user)
        }
    )

}


// User Order List=> arr
exports.userPurchaseList = (req,res) => {
    Order.find({user: req.profile._id})
    // populate("UpdateModel", "Fields want to update")
    .populate("user","_id name")
    .exec((err,order) => {
        if(err){
            return res.status(400).json(
                    { error: "No Order Found" }
                )
        }
        return res.json(order)
    })

}

// Middleware the push Order into Purchase List
exports.pushOrderInPurchaseList = (req,res,next) => {

    let purchases = []
    req.body.order.prodcuts.forEach(product => {
        purchases.push({
            
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.oder.transaction_id
        })
        // Store in DB
        User.findByIdAndUpdate(
            {_id: req.profile._id},
            {$push: {purchases:purchases}},
            {new: true},
            (err, purchases) => {
                if(err){
                    res.status(400).json({
                        error: "Unable to save purchase List"
                    })
                };
                next();
            }

        )

    })
}