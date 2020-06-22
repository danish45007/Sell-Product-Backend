const express = require('express');
const router = express.Router()
const {signout,signup,signin,emailactivate} = require("../Controllers/auth");
const {check, validationResult} = require('express-validator');

// Signup Route
router.post("/signup",[
    check("name")
    .isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
    check("email").isEmail().withMessage("Email is required"),check("password").isLength({ min:5 }).withMessage("must be at least 5 chars long")
], signup)


// email activate
router.post("/email-activate",emailactivate)


// Signin Route 
router.post("/signin",[
    check("email")
    .isEmail().withMessage('Email is required'),
    check("password").isLength({ min: 5 }).withMessage("Password is required")
], signin)

// Signout Route
router.get("/signout",signout)


module.exports = router;