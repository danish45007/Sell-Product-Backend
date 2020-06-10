const mongoose = require('mongoose');
// destruct
const {ObjectId} = mongoose.Schema;;


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    description: { 
        type: String,
        trim: true,
        maxlength:1500
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    stock: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data:Buffer,
        contentType: String
    }
},{timestamps:true});


export default mongoose.model("Product",productSchema);

