const User = require("../Models/user");
const express = require('express');
const router = express.Router()


const {getUserById, getUser, getUsers, updateUser, userPurchaseList} = require('../Controllers/user')
const {isSignedIn,isAuthenticated,isAdmin} = require('../Controllers/auth')

// To popuate userinfo from DB based on UserID
router.param("userId", getUserById);

// Get User for userId
router.get("/user/:userId", isSignedIn,isAuthenticated, getUser);

// Get all the Users
router.get("/users",getUsers)

// Put route
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)

// // Get user Order-Cart info
// router.get("/order/user/:userId",isSignedIn,isAuthenticated, userPurchaseList)

module.exports = router;
