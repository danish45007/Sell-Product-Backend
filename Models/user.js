const mongoose = require('mongoose');
const uuid = require('uuid');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastName: { 
        type: String,
        required: false,
        maxlength: 32,
        trim: true 
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    userinfo: {
        type: String,
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    role: {
        type: Number,
        default: 0,
        required: false
    },
    purchases: {
        type: Array,
        default: []
    }
    
},{timestamps: true});


UserSchema.virtual("password")
// setting the virtual field
.set(function (password) {
    this._password = password
    this.salt =  uuidv1()
    this.encry_password = this.securePassword(password)
    })
// Gettinh the virual field
.get(function () {
    return this._password
    })




UserSchema.method = {

    authenticate: function () {

        return this.securePassword(plainpassword) === this.encry_password

    },


    securePassword: function (plainpassword) {
        if (!plainpassword) {
            return "";
        } else {
            
            try {
            
                return crypto.createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex');
                
            } catch (err) {
                return "Please Try Again";
                
            }
    
        }        

    }
}




// trow out the user schema
module.exports = mongoose.model("User",UserSchema); 


