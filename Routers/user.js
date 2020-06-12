const User = require("../Models/user");
const express = require('express');
const router = express.Router()


const {getUserById, getUser, getUsers} = require('../Controllers/user')
const {isSignedIn,isAuthenticated,isAdmin} = require('../Controllers/auth')

// To popuate userinfo from DB based on UserID
router.param("userId", getUserById);

// Get User for userId
router.get("/user/:userId", isSignedIn,isAuthenticated, getUser);

// Get all the Users
router.get("/users",getUsers)


module.exports = router;
