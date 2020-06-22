require('dotenv').config();
const User = require("../Models/user");
const {check,validationResult, cookie} = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const nodemailer = require("nodemailer");





// Signup method  
exports.signup = (req,res) => {
    const {name,email, password} = req.body;
    User.findOne({email}).exec((err,user) => {
        if(user) {
            res.status(400).json({
                error:"User with this email already exist"
            })
        }
        
        const token = jwt.sign({name,email,password},process.env.SECRET,{expiresIn:'20m'});
              
              
        async function main() {
            
            let testAccount = await nodemailer.createTestAccount();
        
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
                },
            });
            
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '<unnameddevelopers123@gmail.com>', // sender address
                to:email, // list of receivers
                subject: "Account Activation Link",
            //   text: "Hello world?", // plain text body
                html: `
                <h2>Please click on the given link to activate your account</h2>
                <a href="${process.env.CLIENT_URL}/authentication/activate/${token}">Click here to activate</a>
                `
            });
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            return res.json({message: `Email has been send on ${email}, Kindly check`})
            }
            main().catch(console.error);
     
    })
};
             
// email activate

exports.emailactivate = (req,res) => {
    const {token} = req.body;
    if(token){
        jwt.verify(token, process.env.SECRET, function(err,decodedToken){
            if(err){
                return res.status(400).json(
                        { error: "Incorrect Link" }
                    )
            }
            const {name, email, password} = decodedToken
            User.findOne({email}).exec((err,user) => {
                if(user) {
                    return res.status(400).json({
                        error:"User already exist linked with this emailId"
                    })
                }
                let newUser = User({name,email, password})
                newUser.save((err,user) => {
                    if(err){
                        return res.status(400).json({
                            error:"Unable to create user"
                        })
                    }
                    return res.json({
                        message: "Signup Successful!"
                    })
                })
            })

        })

    }
    else{
        return res.status(400).json(
            {error: "Somthing Went Wrong"}
        )
    } 
}
    


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

// Protected Routes/middleware
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    UserProperty: "auth"
});


// Coustom middlewares
exports.isAdmin = (req,res,next) => {

    if (req.profile.role == 0){
        return res.status(403).json(
            { error: "You are not Admin, Access Denied" }
        )
    }
    next();
}

// Authentication middleware
// req.profile -> from frontend
exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!check) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}


// Signout method
exports.signout= (req,res) => {
    // clear cookie => clear token 
    res.clearCookie("token")
    res.json({
        message: "Your Signout"
    });

};

