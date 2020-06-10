const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'Product'
    },
    name: String,
    count: Number,
    price: Number
})

export default ProductCartSchema.model("ProductCart",ProductCartSchema)

const orderSchema = new mongoose.Schema({
    // products inside the cart arr=> ProductCartSchema
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
    },
    updated: Date,
    user:{
        type: ObjectId,
        ref: 'User'
    } 
},{timestamps:true})

export default mongoose.model("Order",orderSchema)
